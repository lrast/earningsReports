"""Global command palette opened with Cmd+K (mac) or Ctrl+K (win/linux)."""

from __future__ import annotations

import streamlit as st
import streamlit_hotkeys as hotkeys

_SESSION_OPEN_KEY = "command_palette_open"
_setup_script_run_ctx_id: int | None = None


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

_COMMANDS: dict[str, object] = {
    "Go to Dashboard": lambda: st.write("Navigating to Dashboard..."),
    "Export Data": lambda: st.write("Exporting dataset as CSV..."),
    "Clear Cache": lambda: st.cache_resource.clear(),
    "Show Help": lambda: st.write("Displaying help menu..."),
}


def _init_session_state() -> None:
    if _SESSION_OPEN_KEY not in st.session_state:
        st.session_state[_SESSION_OPEN_KEY] = False


@st.dialog("Command Palette")
def _show_command_palette() -> None:
    search = st.text_input("Search commands...", placeholder="Type a command...")

    if search:
        filtered = [cmd for cmd in _COMMANDS if search.lower() in cmd.lower()]

        for cmd in filtered:
            if st.button(cmd, use_container_width=True):
                _COMMANDS[cmd]()
                st.session_state[_SESSION_OPEN_KEY] = False
                st.rerun()


def setup_command_palette() -> None:
    """Register palette hotkeys and show the dialog when requested."""
    if _already_setup_this_script_run():
        return

    _init_session_state()

    hotkeys.activate([
        hotkeys.hk("palette", "k", meta=True),
        hotkeys.hk("palette", "k", ctrl=True),
    ])

    if hotkeys.pressed("palette"):
        st.session_state[_SESSION_OPEN_KEY] = True

    if st.session_state[_SESSION_OPEN_KEY]:
        _show_command_palette()
