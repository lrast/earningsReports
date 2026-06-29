"""Corporate Earnings Explorer — Streamlit entrypoint, layout, and navigation."""

from __future__ import annotations

from pathlib import Path

import streamlit as st

from utilities.load_assets import load_css

from components.command_palette import mount_command_palette
from components.sidebar import mount_sidebar

from page_state import get_page_state, init_page_state


APP_DIR = Path(__file__).resolve().parent

NAV_ITEMS: list[dict] = [
    {"file": "Home.py", "title": "Home", "icon": "🏠", "default": True},
    {"file": "pages/YearlyFinancials.py", "title": "Yearly Financials", "icon": "📊"},
    {"file": "pages/MultiYearFinancials.py", "title": "Multi-Year Financials", "icon": "📈"},
    {"file": "pages/SmartColumns.py", "title": "Smart Columns", "icon": "⚙️"},
]


def home() -> None:
    st.title("Corporate Earnings Explorer")
    st.markdown(
        """
Data interface for exploring earnings report filings and financial tables.

"""
    )
    st.info("Use the command palette with **⌘K** (Mac) or **Ctrl+K** (Windows/Linux) to search earnings Filings.")

    st.subheader("Views")
    st.page_link("pages/YearlyFinancials.py", label="Yearly Financials", icon="📊")
    st.caption("Cross-company, single year comparisons.")
    st.page_link("pages/MultiYearFinancials.py", label="Multi-Year Financials", icon="📈")
    st.caption("Cross-company, multi-year comparisons.")


def build_pages() -> tuple[list[st.Page], dict[str, st.Page]]:
    pages: list[st.Page] = []
    page_by_file: dict[str, st.Page] = {}
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
        page_by_file[item["file"]] = page
    return pages, page_by_file


# Run the global parts of the page
if not st.session_state.get("session_configured"):
    st.set_page_config(
        page_title="Corporate Earnings",
        page_icon="📈",
        layout="wide",
        initial_sidebar_state="expanded",
    )
    init_page_state()
    st.session_state["session_configured"] = True

st.markdown(load_css("global.css"), unsafe_allow_html=True)

pages, _page_by_file = build_pages()

mount_command_palette()
mount_sidebar()

pages = get_page_state().update_dynamic_pages(pages, app_dir=APP_DIR)
st.navigation(pages).run()
