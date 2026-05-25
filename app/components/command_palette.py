"""Command palette: styles, JS component, and navigation from palette selection."""

from __future__ import annotations

from collections.abc import Callable

import streamlit as st

from utilities.load_assets import COMMAND_PALETTE_CSS, load_css, load_js_component

COMMAND_PALETTE_KEY = "_app_js_command_palette"
_JS_COMPONENTS: dict[str, st.components.v2.types.ComponentRenderer] = {}


def mount_command_palette(
    nav_items: list[dict],
    *,
    on_change: Callable[[], None] | None = None,
):
    """Load palette styles, mount the JS component, and handle navigation."""
    st.markdown(load_css(COMMAND_PALETTE_CSS), unsafe_allow_html=True)

    key = COMMAND_PALETTE_KEY
    if "command_palette" not in _JS_COMPONENTS:
        _JS_COMPONENTS["command_palette"] = load_js_component(
            "command_palette", "command_palette.js"
        )

    component_state = st.session_state.get(key, {})
    navigate_target = component_state.get("value")
    data = {
        "navItems": [
            {"file": i["file"], "title": i["title"], "icon": i["icon"]}
            for i in nav_items
        ],
    }

    def _handle_palette_change() -> None:
        state = st.session_state.get(key, {})
        target = state.get("value")
        print(target)
        if target:
            st.switch_page("app/" + str(target))
        if on_change is not None:
            on_change()

    return _JS_COMPONENTS["command_palette"](
        data=data,
        default={"value": navigate_target},
        key=key,
        height=0,
        on_value_change=_handle_palette_change,
    )
