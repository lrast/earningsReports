"""Command palette: styles, JS component, and navigation from palette selection."""

from __future__ import annotations

from collections.abc import Callable

import streamlit as st

from utilities.load_assets import COMMAND_PALETTE_CSS, load_css, load_js_component

COMMAND_PALETTE_KEY = "_app_js_command_palette"
PENDING_PAGE_KEY = "_command_palette_pending_page"
LAST_TARGET_KEY = "_command_palette_last_target"
CURRENT_PAGE_KEY = "_app_current_page_file"
_JS_COMPONENTS: dict[str, st.components.v2.types.ComponentRenderer] = {}


def mount_command_palette(
    nav_items: list[dict],
    page_by_file: dict[str, st.Page],
    *,
    on_change: Callable[[], None] | None = None,
):
    """Load palette styles, mount the JS component, and handle navigation."""
    _consume_pending_page_switch(page_by_file)

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
        current = st.session_state.get(CURRENT_PAGE_KEY)
        # Ignore only if user selects the page they're already on.
        if target and target in page_by_file and target != current:
            st.session_state[PENDING_PAGE_KEY] = target
            st.session_state[LAST_TARGET_KEY] = target
        if on_change is not None:
            on_change()

    return _JS_COMPONENTS["command_palette"](
        data=data,
        default={"value": navigate_target},
        key=key,
        height=0,
        on_value_change=_handle_palette_change,
    )


def _consume_pending_page_switch(
    page_by_file: dict[str, st.Page],
) -> None:
    """Run deferred navigation outside widget callbacks (switch_page reruns)."""
    pending = st.session_state.pop(PENDING_PAGE_KEY, None)
    if pending and pending in page_by_file:
        # Clear the component's value before switching so we don't "snap back"
        # due to a replayed on_value_change on subsequent reruns.
        try:
            if isinstance(st.session_state.get(COMMAND_PALETTE_KEY), dict):
                st.session_state[COMMAND_PALETTE_KEY] = {
                    **st.session_state[COMMAND_PALETTE_KEY],
                    "value": None,
                }
        except Exception:
            pass
        st.switch_page(page_by_file[pending])
