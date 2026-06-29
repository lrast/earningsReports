from __future__ import annotations

import re
from collections.abc import Callable

import streamlit as st
from edgar import set_identity, Company, find

from page_state import OpenSheets
from utilities.parsed_command import ParsedCommand, display_name_from_parsed, identity_label
from utilities.renderers import render_rich

set_identity("Your Name yourname@domain.com")


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


def build_dynamic_page(
    page_state: OpenSheets,
    parsed: ParsedCommand,
) -> tuple[Callable[[], None], str]:
    """Build a page renderer and title without fetching Edgar data.

    Data is loaded inside render_document_view when that page is active.
    """
    command_id = parsed["command_id"]
    page_title = display_name_from_parsed(parsed)
    widget_key = re.sub(
        r"[^a-zA-Z0-9_-]+",
        "_",
        f"{identity_label(parsed)}_{parsed['statement_name']}_{parsed['year']}",
    )

    def render_document_view() -> None:
        statement = page_state.get_statement(command_id)
        if statement is None:
            with st.spinner("Loading statement..."):
                statement = load_statement(parsed)
                page_state.set_statement(command_id, statement)
        render_rich(statement)
        if st.button("Delete Page", key=f"del_{widget_key}"):
            page_state.delete_page(command_id)
            st.rerun()

    return render_document_view, page_title
