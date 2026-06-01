import re
from datetime import date

import streamlit as st
from edgar import set_identity, Company, find

from utilities.renderers import render_rich


set_identity("Your Name yourname@domain.com")


def fetch_document_by_url(command_id: str, *, page_entry=None):
    """Parse a palette leaf id and return a page renderer from document_template.

    Examples:
        company:Apple Inc/balance_sheet/2023
        ticker:AAPL/cash_flow/2024
        ticker:AAPL/company:Apple Inc/income/2023
    """
    if not command_id:
        return None

    print('command_id', command_id)

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

    return document_template(
        ticker_name=ticker_name,
        company_name=company_name,
        year=year,
        statement_name=statement_slug,
        page_entry=page_entry if page_entry is not None else command_id,
    )


def document_template(ticker_name=None, company_name=None, year=None,
                      statement_name="balance_sheet", *, page_entry=None):
    """Fetch the relevant filing document and return a page renderer."""

    if year is None:
        year = date.today().year - 1

    if ticker_name and not company_name:
        # only ticker
        company = Company(ticker_name)
        name = ticker_name
    elif not ticker_name:
        # only company name
        company = find(company_name)[0]
        name = company_name
    else:
        # both
        name = f'{ticker_name} - {company_name}'
        company = find(name)[0]

    display_names = {
        "balance_sheet": "Balance Sheet",
        "cash_flow": "Cash Flow Statement",
        "income": "Income Statement",
        "equity": "Statement of Equity",
        "comprehensive_income": "Comprehensive Income",
    }

    delete_key = re.sub(r"[^a-zA-Z0-9_-]+", "_", f"{name}_{statement_name}_{year}")

    # get the statement
    filing = company.get_filings(form="10-K", year=year, amendments=False).latest()
    if filing is None:
        stmt = 'Statement not found.'
    else:
        xbrl = filing.xbrl()

        match statement_name:
            case "balance_sheet":
                stmt = xbrl.statements.balance_sheet()
            case "cash_flow":
                stmt = xbrl.statements.cashflow_statement()
            case "income":
                stmt = xbrl.statements.income_statement()
            case "equity":
                stmt = xbrl.statements.statement_of_equity()
            case "comprehensive_income":
                stmt = xbrl.statements.comprehensive_income()

    def render_document_view():
        render_rich(stmt)
        if st.button("Delete Page", key=f"del_{delete_key}"):
            entry = page_entry if page_entry is not None else name
            st.session_state.dynamic_pages.remove(entry)
            st.rerun()

    page_title = f'{name} {display_names[statement_name]} ({year}) '

    return render_document_view, page_title
