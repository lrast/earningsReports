import re
from collections.abc import Callable
from typing import TypedDict

import streamlit as st
from edgar import set_identity, Company, find

from utilities.renderers import render_rich


set_identity("Your Name yourname@domain.com")

DYNAMIC_STATEMENT_CACHE_KEY = "dynamic_statement_cache"
PALETTE_NAV_REQUESTED_KEY = "_command_palette_nav_requested"

DISPLAY_NAMES = {
    "balance_sheet": "Balance Sheet",
    "cash_flow": "Cash Flow Statement",
    "income": "Income Statement",
    "equity": "Statement of Equity",
    "comprehensive_income": "Comprehensive Income",
}


class ParsedCommand(TypedDict):
    command_id: str
    ticker_name: str | None
    company_name: str | None
    year: int
    statement_name: str


def parse_command_id(command_id: str) -> ParsedCommand | None:
    """Parse a palette leaf id into identity, statement, and year."""
    if not command_id:
        return None

    parts = command_id.split("/")
    if len(parts) < 3:
        return None

    year_slug = parts[-1]
    statement_slug = parts[-2]
    identity_parts = parts[:-2]

    try:
        year = int(year_slug)
    except ValueError:
        return None

    ticker_name = None
    company_name = None
    for part in identity_parts:
        if part.startswith("ticker:"):
            ticker_name = part.removeprefix("ticker:") or None
        elif part.startswith("company:"):
            company_name = part.removeprefix("company:") or None

    if ticker_name is None and company_name is None:
        return None

    return ParsedCommand(
        command_id=command_id,
        ticker_name=ticker_name,
        company_name=company_name,
        year=year,
        statement_name=statement_slug,
    )


def _identity_label(parsed: ParsedCommand) -> str:
    ticker_name = parsed["ticker_name"]
    company_name = parsed["company_name"]
    if ticker_name and not company_name:
        return ticker_name
    if not ticker_name:
        return company_name or ""
    return f"{ticker_name} - {company_name}"


def display_name_from_parsed(parsed: ParsedCommand) -> str:
    """Sidebar title from parsed command id (no Edgar calls)."""
    label = _identity_label(parsed)
    statement_name = parsed["statement_name"]
    year = parsed["year"]
    display = DISPLAY_NAMES.get(statement_name, statement_name)
    return f"{label} {display} ({year}) "


def load_statement(parsed: ParsedCommand):
    """Fetch filing statement data from Edgar."""
    ticker_name = parsed["ticker_name"]
    company_name = parsed["company_name"]
    year = parsed["year"]
    statement_name = parsed["statement_name"]

    if ticker_name and not company_name:
        company = Company(ticker_name)
    elif not ticker_name:
        company = find(company_name)[0]
    else:
        company = find(f"{ticker_name} - {company_name}")[0]

    filing = company.get_filings(form="10-K", year=year, amendments=False).latest()
    if filing is None:
        return "Statement not found."

    xbrl = filing.xbrl()
    if xbrl is None:
        return "Statement not found."

    match statement_name:
        case "balance_sheet":
            return xbrl.statements.balance_sheet()
        case "cash_flow":
            return xbrl.statements.cashflow_statement()
        case "income":
            return xbrl.statements.income_statement()
        case "equity":
            return xbrl.statements.statement_of_equity()
        case "comprehensive_income":
            return xbrl.statements.comprehensive_income()
        case _:
            return "Statement not found."


def _remove_dynamic_page(command_id: str) -> None:
    st.session_state.dynamic_pages.remove(command_id)
    cache = st.session_state.get(DYNAMIC_STATEMENT_CACHE_KEY)
    if isinstance(cache, dict):
        cache.pop(command_id, None)
    if st.session_state.get(PALETTE_NAV_REQUESTED_KEY) == command_id:
        st.session_state.pop(PALETTE_NAV_REQUESTED_KEY, None)


def build_dynamic_page(command_id: str) -> tuple[Callable[[], None], str] | None:
    """Build a page renderer and title without fetching Edgar data.

    Data is loaded inside render_document_view when that page is active.
    """
    parsed = parse_command_id(command_id)
    if parsed is None:
        return None

    page_title = display_name_from_parsed(parsed)
    widget_key = re.sub(
        r"[^a-zA-Z0-9_-]+",
        "_",
        f"{_identity_label(parsed)}_{parsed['statement_name']}_{parsed['year']}",
    )

    def render_document_view() -> None:
        cache = st.session_state.setdefault(DYNAMIC_STATEMENT_CACHE_KEY, {})
        if command_id not in cache:
            with st.spinner("Loading statement..."):
                cache[command_id] = load_statement(parsed)
        render_rich(cache[command_id])
        if st.button("Delete Page", key=f"del_{widget_key}"):
            _remove_dynamic_page(command_id)
            st.rerun()

    return render_document_view, page_title


def filter_command_ids(command_ids: list[str]) -> list[str]:
    """Keep only ids that build_dynamic_page accepts (drops stale bare names, etc.)."""
    return [command_id for command_id in command_ids if parse_command_id(command_id) is not None]
