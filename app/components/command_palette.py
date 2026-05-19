"""Global command palette opened with Cmd+K (mac) or Ctrl+K (win/linux)."""

from __future__ import annotations

import streamlit as st
import streamlit_hotkeys as hotkeys

PALETTE_STATE_KEY = "command_palette_state"
_setup_script_run_ctx_id: int | None = None

_COMMANDS: dict[str, object] = {
    "Go to Dashboard": lambda: st.write("Navigating to Dashboard..."),
    "Export Data": lambda: st.write("Exporting dataset as CSV..."),
    "Clear Cache": lambda: st.cache_resource.clear(),
    "Show Help": lambda: st.write("Displaying help menu..."),
}


@st.dialog("Command Palette")
def _show_command_palette() -> None:
    search = st.text_input("Search commands...", placeholder="Type a command...")

    if search:
        filtered = [cmd for cmd in _COMMANDS if search.lower() in cmd.lower()]

        for cmd in filtered:
            if st.button(cmd, use_container_width=True):
                _COMMANDS[cmd]()
                st.session_state[PALETTE_STATE_KEY] = False
                st.rerun()


def setup_command_palette() -> None:
    """Register palette hotkeys and show the dialog when requested."""
    if _already_setup_this_script_run():
        return

    if PALETTE_STATE_KEY not in st.session_state:
        st.session_state[PALETTE_STATE_KEY] = False

    hotkeys.activate([
        hotkeys.hk("palette", "k", meta=True, prevent_default=True),
        hotkeys.hk("palette", "k", ctrl=True, prevent_default=True),
    ])

    if hotkeys.pressed("palette"):
        st.session_state[PALETTE_STATE_KEY] = not st.session_state[PALETTE_STATE_KEY]

    if st.session_state[PALETTE_STATE_KEY]:
        _show_command_palette()


def _already_setup_this_script_run() -> bool:
    """True when hotkeys/dialog were already registered in this script run."""
    global _setup_script_run_ctx_id
    try:
        from streamlit.runtime.scriptrunner import get_script_run_ctx

        ctx = get_script_run_ctx()
    except Exception:
        ctx = None
    if ctx is None:
        return False
    run_ctx_id = id(ctx)
    if _setup_script_run_ctx_id == run_ctx_id:
        return True
    _setup_script_run_ctx_id = run_ctx_id
    return False

