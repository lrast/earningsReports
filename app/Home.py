"""Corporate Earnings Explorer — Streamlit entrypoint, layout, and navigation."""

from __future__ import annotations

import re
from pathlib import Path

import streamlit as st

from components.command_palette import (
    PENDING_NAV_COMMAND_KEY,
    SELECTED_COMMAND_KEY,
    mount_command_palette,
)
from utilities.load_assets import load_css
from pages.statement_page import fetch_document_by_url

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
    st.info("Use the command palette with **⌘K** (Mac) or **Ctrl+K** (Windows/Linux) to search earnings.")

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
    st.button("", icon="➕", use_container_width=True)


# Initialize session state to track user-created pages
if "dynamic_pages" not in st.session_state:
    st.session_state.dynamic_pages = []


# Dynamically append pages from session state
_used_url_paths = {p.url_path for p in pages if p.url_path}
command_pages: dict[str, st.Page] = {}
for command_id in st.session_state.dynamic_pages:
    page = fetch_document_by_url(command_id, page_entry=command_id)
    if page is None:
        continue
    page_fn, page_title = page
    url_path = _dynamic_page_url_path(command_id, _used_url_paths)
    page_obj = st.Page(page_fn, title=page_title, icon="📄", url_path=url_path)
    pages.append(page_obj)
    command_pages[command_id] = page_obj

pending_command = st.session_state.pop(PENDING_NAV_COMMAND_KEY, None)
if pending_command and pending_command in command_pages:
    st.switch_page(command_pages[pending_command])

st.navigation(pages).run()
