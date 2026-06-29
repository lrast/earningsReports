"""Sidebar: custom layout and last-command display."""
from __future__ import annotations

import streamlit as st

from components.command_palette import SELECTED_COMMAND_KEY


def mount_sidebar() -> None:
    """Render custom sidebar elements — last command pinned to bottom."""
    st.html(
        """
        <style>
        /* Target the specific container key and force it to the bottom */
        .st-key-sidebar_bottom {
            position: absolute;
            bottom: 20px;
            left: 0;
            width: 100%;
            padding: 0 1rem; /* matches standard sidebar padding */
        }
        </style>
        """
    )

    with st.sidebar.container(key="sidebar_bottom"):
        st.divider()
        selected = st.session_state.get(SELECTED_COMMAND_KEY)
        st.caption("Last command")
        st.write(selected if selected else "—")
