import streamlit as st

from PageTemplate import init_page, run_navigation

init_page()


def home():
    st.title("Corporate Earnings Explorer")
    st.markdown(
        """
Data interface for exploring earnings report filings and financial tables.

Choose a view from the sidebar, or use the links below.
"""
    )

    st.subheader("Views")
    col1, col2, col3 = st.columns(3)

    with col1:
        st.page_link("TableView.py", label="Yearly Financials", icon="📊")
        st.caption("Pivot and filter sheet data by year and line items.")

    with col2:
        st.page_link("general_doc_view.py", label="General Doc View", icon="📄")
        st.caption("Rich-rendered Edgar documents (e.g. cash flow statements).")

    with col3:
        st.page_link("test_doc_view.py", label="Test Doc View", icon="🧪")
        st.caption("Rich-rendered cash flow statement from company financials.")


run_navigation(home=home)
