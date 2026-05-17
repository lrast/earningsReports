import streamlit as st

st.set_page_config(
    page_title="Corporate Earnings",
    layout="wide",
)


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
        st.caption("Rich-rendered Edgar documents (cash flow + React demo).")

    with col3:
        st.page_link("test_doc_view.py", label="Test Doc View", icon="🧪")
        st.caption("Rich-rendered cash flow statement from company financials.")


pg = st.navigation(
    [
        st.Page(home, title="Home", icon="🏠", default=True),
        st.Page("TableView.py", title="Yearly Financials", icon="📊"),
        st.Page("general_doc_view.py", title="General Doc View", icon="📄"),
        st.Page("test_doc_view.py", title="Test Doc View", icon="🧪"),
    ]
)
pg.run()
