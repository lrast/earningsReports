"""Shared command shape and display helpers (no Streamlit / Edgar deps)."""

from typing import TypedDict

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


def identity_label(parsed: ParsedCommand) -> str:
    ticker_name = parsed["ticker_name"]
    company_name = parsed["company_name"]
    if ticker_name and not company_name:
        return ticker_name
    if not ticker_name:
        return company_name or ""
    return f"{ticker_name} - {company_name}"


def display_name_from_parsed(parsed: ParsedCommand) -> str:
    """Sidebar title from parsed command (no Edgar calls)."""
    label = identity_label(parsed)
    statement_name = parsed["statement_name"]
    year = parsed["year"]
    display = DISPLAY_NAMES.get(statement_name, statement_name)
    return f"{label} {display} ({year}) "
