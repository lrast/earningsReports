"""Global Streamlit layout: page config, navigation, and shared styles."""

from __future__ import annotations

from collections.abc import Callable
from pathlib import Path

import streamlit as st

from utilities.load_assets import load_css, load_js_component

APP_DIR = Path(__file__).resolve().parent


COMMAND_PALETTE_KEY = "_app_js_command_palette"


_JS_COMPONENTS: dict[str, st.components.v2.types.ComponentRenderer] = {}


def init_page() -> None:
    """Apply global page config, layout CSS, and sidebar branding.

    Call once from the app entrypoint (``Home.py``) before ``run_navigation()``.
    The entrypoint reruns on every navigation, so child pages need not call this.
    """

    # set up page configuration
    if not st.session_state.get("session_configured"):
        st.set_page_config(
            page_title="Corporate Earnings",
            page_icon="📈",
            layout="wide",
            initial_sidebar_state="expanded",
        )
        st.session_state["session_configured"] = True

    # global styling
    st.markdown(load_css("global.css"), unsafe_allow_html=True)
    st.markdown(load_css("command_palette.css"), unsafe_allow_html=True)

    print('called')

    if "command_palette" not in _JS_COMPONENTS:
        print('rendered')
        command_palette_handler()


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


def command_palette_handler(
    *,
    on_change: Callable[[], None] | None = None,
):
    """Mount the command palette and handle JS state updates (bidirectional pattern)."""
    key: str = COMMAND_PALETTE_KEY,
    if "command_palette" not in _JS_COMPONENTS:
        _JS_COMPONENTS["command_palette"] = load_js_component("command_palette", "command_palette.js")

    component_state = st.session_state.get(key, {})
    navigate_target = component_state.get("value")

    data = {
        "navItems": [
            {"file": i["file"], "title": i["title"], "icon": i["icon"]}
            for i in NAV_ITEMS
        ],
    }
    default = {"value": navigate_target}

    def _handle_palette_change() -> None:
        state = st.session_state.get(key, {})
        target = state.get("value")
        if target:
            st.switch_page(str(APP_DIR / target))
        if on_change is not None:
            on_change()

    return _JS_COMPONENTS["command_palette"](
        data=data,
        default=default,
        key=key,
        height=0,
        on_value_change=_handle_palette_change,
    )


def run_navigation(home=None) -> None:
    """Run the app navigation sidebar (call from the entrypoint page)."""
    build_navigation(home=home).run()


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
