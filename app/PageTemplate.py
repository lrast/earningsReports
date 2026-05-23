"""Global Streamlit layout: page config, navigation, and shared styles."""

from __future__ import annotations
import streamlit as st
from utilities.load_assets import load_css, load_js_component

from pathlib import Path

APP_DIR = Path(__file__).resolve().parent

_JS_COMPONENTS: dict[str, st.components.v2.types.ComponentRenderer] = {}


def init_page() -> None:
    """Apply global page config, layout CSS, and sidebar branding.

    Call at the top of every page module. When a non-home page is run directly
    (``streamlit run app/TableView.py``), navigation is started automatically.

    Set ``pinned_right_sidebar=True`` on pages that use a fixed right-hand column
    (e.g. TableView filter controls).
    """

    # set up page configuration
    if not st.session_state.get('session_configured'):
        st.set_page_config(
            page_title="Corporate Earnings",
            page_icon="📈",
            layout="wide",
            initial_sidebar_state="expanded",
        )
        st.session_state['session_configured'] = True

    # global styling
    st.markdown(load_css("global.css"), unsafe_allow_html=True)

    # set up the command palette
    if not st.session_state.get('command_palette_loaded'):
        palette = load_js_component("command_palette", "main.js")
        palette(key="_app_js_command_palette", height=0)

        st.session_state['command_palette_loaded'] = True


def run_navigation(home=None) -> None:
    """Run the app navigation sidebar (call from the entrypoint page)."""
    build_navigation(home=home).run()


def build_navigation(home=None):
    """Build ``st.navigation`` from :data:`NAV_ITEMS`."""
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
