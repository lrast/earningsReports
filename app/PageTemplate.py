"""Global Streamlit layout: page config, navigation, and shared styles."""

from __future__ import annotations

from pathlib import Path

import streamlit as st

from components.command_palette import setup_command_palette

APP_DIR = Path(__file__).resolve().parent
APP_TITLE = "Corporate Earnings"
PAGE_ICON = "📈"

NAV_ITEMS: list[dict] = [
    {
        "file": "Home.py",
        "title": "Home",
        "icon": "🏠",
        "default": True,
    },
    {
        "file": "TableView.py",
        "title": "Yearly Financials",
        "icon": "📊",
    },
    {
        "file": "general_doc_view.py",
        "title": "General Doc View",
        "icon": "📄",
    },
    {
        "file": "test_doc_view.py",
        "title": "Test Doc View",
        "icon": "🧪",
    },
]

GLOBAL_CSS = """
<style>
  :root {
    --pinnedSidebarWidth: clamp(300px, 22vw, 460px);
    --pinnedSidebarGap: 1.5rem;
  }

  div.block-container {
    padding-top: 2rem;
    max-width: 100%;
  }

  [data-testid="stSidebar"] [data-testid="stSidebarNav"] {
    padding-top: 0.25rem;
  }
</style>
"""

PINNED_RIGHT_SIDEBAR_CSS = """
<style>
  div.block-container {
    padding-right: calc(var(--pinnedSidebarWidth) + var(--pinnedSidebarGap)) !important;
  }

  div[data-testid="stHorizontalBlock"] > div:nth-child(2) {
    position: fixed !important;
    top: 3.5rem !important;
    bottom: 1rem !important;
    right: var(--pinnedSidebarGap) !important;
    width: var(--pinnedSidebarWidth) !important;
    z-index: 998 !important;
    background: var(--background-color) !important;
    overflow-y: auto !important;
    padding-bottom: 2rem !important;
    padding-left: 2rem !important;
  }
</style>
"""

_SESSION_CONFIG_KEY = "_app_template_configured"


def build_navigation(home=None):
    """Build ``st.navigation`` from :data:`NAV_ITEMS`."""
    pages = []
    for item in NAV_ITEMS:
        path = APP_DIR / item["file"]
        if item["file"] == "Home.py" and home is not None:
            pages.append(
                st.Page(
                    home,
                    title=item["title"],
                    icon=item["icon"],
                    default=item.get("default", False),
                )
            )
        else:
            pages.append(
                st.Page(
                    str(path),
                    title=item["title"],
                    icon=item["icon"],
                    default=item.get("default", False),
                )
            )
    return st.navigation(pages)


def run_navigation(home=None) -> None:
    """Run the app navigation sidebar (call from the entrypoint page)."""
    setup_command_palette()
    build_navigation(home=home).run()


def init_page(
    caller_file: str | None = None,
    *,
    pinned_right_sidebar: bool = False,
) -> None:
    """Apply global page config, layout CSS, and sidebar branding.

    Call at the top of every page module. When a non-home page is run directly
    (``streamlit run app/TableView.py``), navigation is started automatically.

    Set ``pinned_right_sidebar=True`` on pages that use a fixed right-hand column
    (e.g. TableView filter controls).
    """
    _ensure_page_config()
    _inject_global_css()
    if pinned_right_sidebar:
        st.markdown(PINNED_RIGHT_SIDEBAR_CSS, unsafe_allow_html=True)
    _render_sidebar_branding()

    if caller_file is None:
        return

    script_path = Path(caller_file).resolve()
    if _is_entry_script(script_path) and script_path.name != "Home.py":
        run_navigation()


def _is_entry_script(script_path: Path) -> bool:
    try:
        from streamlit.runtime.scriptrunner import get_script_run_ctx

        ctx = get_script_run_ctx()
        if ctx is None or ctx.main_script_path is None:
            return False
        return Path(ctx.main_script_path).resolve() == script_path.resolve()
    except Exception:
        return False


def _ensure_page_config() -> None:
    if st.session_state.get(_SESSION_CONFIG_KEY):
        return
    st.set_page_config(
        page_title=APP_TITLE,
        page_icon=PAGE_ICON,
        layout="wide",
        initial_sidebar_state="expanded",
    )
    st.session_state[_SESSION_CONFIG_KEY] = True


def _inject_global_css() -> None:
    st.markdown(GLOBAL_CSS, unsafe_allow_html=True)


def _render_sidebar_branding() -> None:
    if st.session_state.get("_app_sidebar_branding"):
        return
    with st.sidebar:
        st.markdown(f"### {APP_TITLE}")
        st.caption("SEC filings & financial tables")
    st.session_state["_app_sidebar_branding"] = True
