import streamlit as st
from edgar import get_filings, set_identity, Company

from utilities.renderers import render_rich

set_identity("Your Name yourname@domain.com")


def document_template(name):
    company = Company(name)
    cash_flow = company.cash_flow()

    def render_document_view():
        st.title("Browser view of Rich documents")

        #financials = company.get_financials()

        render_rich(cash_flow)
        # Allow users to delete the page dynamically too
        if st.button("Delete Page", key=f"del_{name}"):
            st.session_state.dynamic_pages.remove(name)
            st.rerun()

    return render_document_view

