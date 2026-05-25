"""Corporate Earnings Explorer — Streamlit entrypoint, layout, and navigation."""

from __future__ import annotations

from pathlib import Path

import streamlit as st

from components.command_palette import mount_command_palette
from utilities.load_assets import load_css

APP_DIR = Path(__file__).resolve().parent

NAV_ITEMS: list[dict] = [
    {"file": "Home.py", "title": "Home", "icon": "🏠", "default": True},
    {"file": "TableView.py", "title": "Yearly Financials", "icon": "📊"},
    {"file": "general_doc_view.py", "title": "General Doc View", "icon": "📄"},
    {"file": "test_doc_view.py", "title": "Test Doc View", "icon": "🧪"},
]


def home() -> None:
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


def navigation() -> st.navigation:
    pages = []
    for item in NAV_ITEMS:
        if item["file"] == "Home.py":
            page = st.Page(
                home,
                title=item["title"],
                icon=item["icon"],
                default=item.get("default", False),
            )
        else:
            page = st.Page(
                str(APP_DIR / item["file"]),
                title=item["title"],
                icon=item["icon"],
                default=item.get("default", False),
            )
        pages.append(page)
    return st.navigation(pages)


# Run the page
if not st.session_state.get("session_configured"):
    st.set_page_config(
        page_title="Corporate Earnings",
        page_icon="📈",
        layout="wide",
        initial_sidebar_state="expanded",
    )
    st.session_state["session_configured"] = True

st.markdown(load_css("global.css"), unsafe_allow_html=True)

mount_command_palette(NAV_ITEMS)

navigation().run()
