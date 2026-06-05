"""Command palette: styles, JS component, and command selection handling."""
from __future__ import annotations

from collections.abc import Callable

import streamlit as st

from pages.statement_page import PALETTE_NAV_REQUESTED_KEY, parse_command_id
from utilities.load_assets import COMMAND_PALETTE_CSS, load_css, load_js_component

COMMAND_PALETTE_KEY = "_app_js_command_palette"
SELECTED_COMMAND_KEY = "_command_palette_selected_command"
PENDING_NAV_COMMAND_KEY = "_command_palette_pending_nav"

_JS_COMPONENTS: dict[str, st.components.v2.types.ComponentRenderer] = {}


def add_dynamic_page_from_command(command_id: str) -> str | None:
    """Register a statement page from a palette leaf command.

    Returns the command_id to navigate to (existing or newly added), or None if invalid.
    """
    if parse_command_id(command_id) is None:
        return None

    pages = st.session_state.dynamic_pages
    if command_id in pages:
        return command_id

    pages.append(command_id)
    return command_id


def mount_command_palette(*, on_change: Callable[[], None] | None = None):
    """Load palette styles, mount the JS component, and record the chosen command."""
    st.markdown(load_css(COMMAND_PALETTE_CSS), unsafe_allow_html=True)

    key = COMMAND_PALETTE_KEY
    if "command_palette" not in _JS_COMPONENTS:
        _JS_COMPONENTS["command_palette"] = load_js_component(
            "command_palette", "command_palette.js"
        )

    component_state = st.session_state.get(key, {})
    selected_id = component_state.get("value")

    def _handle_palette_change() -> None:
        state = st.session_state.get(key, {})
        target_id = state.get("value")
        if target_id:
            st.session_state[SELECTED_COMMAND_KEY] = target_id
            nav_id = add_dynamic_page_from_command(target_id)
            nav_requested = st.session_state.get(PALETTE_NAV_REQUESTED_KEY)
            if nav_id and nav_id != nav_requested:
                st.session_state[PENDING_NAV_COMMAND_KEY] = nav_id
                st.session_state[PALETTE_NAV_REQUESTED_KEY] = nav_id
        if on_change is not None:
            on_change()

    return _JS_COMPONENTS["command_palette"](
        data={},
        default={"value": selected_id},
        key=key,
        height=0,
        on_value_change=_handle_palette_change,
    )
