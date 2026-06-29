"""Command palette: styles, JS component, parsing, and command selection handling."""
from __future__ import annotations

from collections.abc import Callable

import streamlit as st

from utilities.parsed_command import ParsedCommand
from utilities.load_assets import COMMAND_PALETTE_CSS, load_css, load_js_component
from pages.statement_page import build_dynamic_page

from page_state import get_page_state


COMMAND_PALETTE_KEY = "_app_js_command_palette"

_JS_COMPONENTS: dict[str, st.components.v2.types.ComponentRenderer] = {}


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
            st.session_state["command_history"] = target_id
            add_dynamic_page_from_command(target_id)
        if on_change is not None:
            on_change()

    return _JS_COMPONENTS["command_palette"](
        data={},
        default={"value": selected_id},
        key=key,
        height=0,
        on_value_change=_handle_palette_change,
    )


def add_dynamic_page_from_command(command_id: str) -> str | None:
    """Parse, build, and register a statement page from a palette leaf command.

    Returns the command_id to navigate to (existing or newly added), or None if invalid.
    """
    parsed = parse_command_id(command_id)
    if parsed is None:
        return None

    page_state = get_page_state()
    command_id = parsed["command_id"]
    if page_state.has_page(command_id):
        page_state.request_navigation(command_id)
        return command_id

    render_fn, title = build_dynamic_page(page_state, parsed)
    if page_state.add_page(parsed, render_fn, title):
        page_state.request_navigation(command_id)
        return command_id
    return None


def parse_command_id(command_id: str) -> ParsedCommand | None:
    """Parse a palette leaf id into identity, statement, and year."""
    if not command_id:
        return None

    parts = command_id.split("/")
    if len(parts) < 3:
        return None

    year_slug = parts[-1]
    statement_slug = parts[-2]
    identity_parts = parts[:-2]

    try:
        year = int(year_slug)
    except ValueError:
        return None

    ticker_name = None
    company_name = None
    for part in identity_parts:
        if part.startswith("ticker:"):
            ticker_name = part.removeprefix("ticker:") or None
        elif part.startswith("company:"):
            company_name = part.removeprefix("company:") or None

    if ticker_name is None and company_name is None:
        return None

    return ParsedCommand(
        command_id=command_id,
        ticker_name=ticker_name,
        company_name=company_name,
        year=year,
        statement_name=statement_slug,
    )
