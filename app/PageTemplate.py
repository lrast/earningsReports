"""Global Streamlit layout: page config, navigation, and shared styles."""

from __future__ import annotations

import inspect
from collections.abc import Callable
from pathlib import Path

import streamlit as st
from streamlit.runtime.scriptrunner_utils.script_run_context import get_script_run_ctx

from utilities.load_assets import load_css, load_js_component

APP_DIR = Path(__file__).resolve().parent


COMMAND_PALETTE_KEY = "_app_js_command_palette"


_JS_COMPONENTS: dict[str, st.components.v2.types.ComponentRenderer] = {}


def init_page() -> None:
    """Apply global page config, layout CSS, and sidebar branding.

    Call at the top of every page module. When a non-home page is run directly
    (``streamlit run app/TableView.py``), navigation is started automatically.

    Set ``pinned_right_sidebar=True`` on pages that use a fixed right-hand column
    (e.g. TableView filter controls).
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

    if _should_mount_command_palette():
        command_palette_handler()


def _should_mount_command_palette() -> bool:
    """Mount the palette only from the entrypoint script, not from every sub-page.

    With ``st.navigation``, ``Home.py`` and the active page both call ``init_page()`` in
    the same run; mounting from both causes duplicate widget keys.
    """
    ctx = get_script_run_ctx()
    if ctx is None:
        return True

    main_script = Path(ctx.main_script_path).resolve()
    for frame in inspect.stack():
        path = Path(frame.filename).resolve()
        if (
            path.parent == APP_DIR
            and path.suffix == ".py"
            and path.name != "PageTemplate.py"
        ):
            return path == main_script
    return True


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
    key: str = COMMAND_PALETTE_KEY,
    on_change: Callable[[], None] | None = None,
):
    """Mount the command palette and handle JS state updates (bidirectional pattern)."""
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
