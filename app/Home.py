import streamlit as st

from PageTemplate import init_page, run_navigation

init_page()


def _welcome_banner(*, title: str, subtitle: str, features: list[str]) -> None:
    items = "".join(f"<li>{item}</li>" for item in features)
    st.markdown(
        f"""
<div style="padding: 1.25rem 1.5rem; border-radius: 12px;
  background: linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25); margin-bottom: 1rem;">
  <h2 style="margin: 0 0 0.5rem; font-size: 1.35rem; font-weight: 600;">{title}</h2>
  <p style="margin: 0 0 1rem; opacity: 0.85; line-height: 1.5; font-size: 0.95rem;">
    {subtitle}
  </p>
  <ul style="margin: 0; padding-left: 1.25rem; opacity: 0.9; font-size: 0.9rem;
    line-height: 1.6;">
    {items}
  </ul>
</div>
""",
        unsafe_allow_html=True,
    )


def home():
    st.title("Corporate Earnings Explorer")
    st.markdown(
        """
Data interface for exploring earnings report filings and financial tables.

Choose a view from the sidebar, or use the links below.
"""
    )

    _welcome_banner(
        title="Explore SEC filings & financial tables",
        subtitle=(
            "Browse yearly financials, rich-rendered Edgar documents, "
            "and experimental views from one place."
        ),
        features=[
            "Pivot and filter sheet data by year and line items",
            "Rich-rendered cash flow and filing documents",
            "Streamlit-native views with no separate front-end build step",
        ],
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
