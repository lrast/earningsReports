import streamlit as st
from edgar import set_identity, Company

from utilities.renderers import render_rich

from datetime import date


set_identity("Your Name yourname@domain.com")


def document_template(name, year=None, statement_name='balance'):
    """ Fetches the relevant filing document, returns a renderer """

    # to do: add fall-backs for statements that are not available
    if year is None:
        year = date.today().year - 1

    company = Company(name)
    filing = company.get_filings(form="10-K", year=year).latest()
    xbrl = filing.xbrl()

    match statement_name:
        case 'balance':
            stmt = xbrl.statements.balance_sheet()
        case 'cash_flow':
            stmt = xbrl.statements.cash_flow()
        case 'income':
            stmt = xbrl.statements.income_statement()
        case 'equity':
            stmt = xbrl.statements.statement_of_equity()
        case 'comprehensive_income':
            stmt = xbrl.statements.comprehensive_income()

    stmt = 'Test'

    display_names = {
        'balance': 'Balance Sheet',
        'cash_flow': 'Cash Flow Statement',
        'income': 'Income Statement',
        'equity': 'Statement of Equity',
        'comprehensive_income': 'Comprehensive Income'
    }

    def render_document_view():
        render_rich(stmt)
        # Allow users to delete the page dynamically too
        if st.button("Delete Page", key=f"del_{name}"):
            st.session_state.dynamic_pages.remove(name)
            st.rerun()

    page_title = f'{name} {display_names[statement_name]} ({year}) '

    return render_document_view, page_title
