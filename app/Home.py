"""Corporate Earnings Explorer — Streamlit entrypoint, layout, and navigation."""

from __future__ import annotations

import re
from pathlib import Path

import streamlit as st

from components.command_palette import (
    SELECTED_COMMAND_KEY,
    mount_command_palette,
)
from utilities.load_assets import load_css
from pages.statement_page import document_template

APP_DIR = Path(__file__).resolve().parent

NAV_ITEMS: list[dict] = [
    {"file": "Home.py", "title": "Home", "icon": "🏠", "default": True},
    {"file": "pages/TableView.py", "title": "Yearly Financials", "icon": "📊"},
    {"file": "pages/general_doc_view.py", "title": "General Doc View", "icon": "📄"},
    {"file": "pages/test_doc_view.py", "title": "Test Doc View", "icon": "🧪"},
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
        st.page_link("pages/TableView.py", label="Yearly Financials", icon="📊")
        st.caption("Pivot and filter sheet data by year and line items.")

    with col2:
        st.page_link("pages/general_doc_view.py", label="General Doc View", icon="📄")
        st.caption("Rich-rendered Edgar documents (e.g. cash flow statements).")

    with col3:
        st.page_link("pages/test_doc_view.py", label="Test Doc View", icon="🧪")
        st.caption("Rich-rendered cash flow statement from company financials.")

    new_page_name = st.text_input("Enter Page Name:")
    if add_view and new_page_name:
        cleaned_name = new_page_name.strip()
        if cleaned_name and cleaned_name not in st.session_state.dynamic_pages:
            st.session_state.dynamic_pages.append(cleaned_name)
            st.success(f"Page '{cleaned_name}' created!")
            st.rerun()
        elif cleaned_name in st.session_state.dynamic_pages:
            st.warning("That page already exists.")


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


def _dynamic_page_url_path(name: str, used: set[str]) -> str:
    """Unique url_path for a user-created page (avoids shared callable name 'render')."""
    base = re.sub(r"[^a-zA-Z0-9_-]+", "_", name.strip().lower()).strip("_") or "dynamic_page"
    candidate = base
    suffix = 2
    while candidate in used:
        candidate = f"{base}_{suffix}"
        suffix += 1
    used.add(candidate)
    return candidate


# Run the global parts of the page
if not st.session_state.get("session_configured"):
    st.set_page_config(
        page_title="Corporate Earnings",
        page_icon="📈",
        layout="wide",
        initial_sidebar_state="expanded",
    )
    st.session_state["session_configured"] = True

st.markdown(load_css("global.css"), unsafe_allow_html=True)

pages, _page_by_file = build_pages()

mount_command_palette()

# custom sidebar elements
with st.sidebar:
    selected = st.session_state.get(SELECTED_COMMAND_KEY)
    if selected:
        st.caption("Last command")
        st.write(selected)
    else:
        st.caption("Last command")
        st.write("—")


# button styling
st.html(
    """
    <style>
    /* Target the specific container key and force it to the bottom */
    .st-key-sidebar_bottom {
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        padding: 0 1rem; /* matches standard sidebar padding */
    }
    </style>
    """
)

with st.sidebar.container(key="sidebar_bottom"):
    st.divider()
    add_view = st.button("",  icon="➕", use_container_width=True)


# Initialize session state to track user-created pages
if "dynamic_pages" not in st.session_state:
    st.session_state.dynamic_pages = []


# Dynamically append pages from session state
_used_url_paths = {p.url_path for p in pages if p.url_path}
for page_name in st.session_state.dynamic_pages:
    page_fn = document_template(page_name)
    url_path = _dynamic_page_url_path(page_name, _used_url_paths)
    pages.append(
        st.Page(page_fn, title=page_name, icon="📄", url_path=url_path)
    )

st.navigation(pages).run()
