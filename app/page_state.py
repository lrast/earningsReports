"""Session-scoped registry for user-created dynamic pages."""

from __future__ import annotations

import re
from pathlib import Path

import streamlit as st

from pages.statement_page import (
    build_dynamic_page,
    filter_command_ids,
    parse_command_id,
)


class PageState:
    def __init__(self) -> None:
        self.command_ids: list[str] = []
        self.statement_cache: dict[str, object] = {}

    def add(self, command_id: str) -> bool:
        """Register a command id if valid. Returns True if present or newly added."""
        if parse_command_id(command_id) is None:
            return False
        if command_id in self.command_ids:
            return True
        self.command_ids.append(command_id)
        return True

    def get_statement(self, command_id: str) -> object | None:
        return self.statement_cache.get(command_id)

    def set_statement(self, command_id: str, statement: object) -> None:
        self.statement_cache[command_id] = statement

    def delete_page(self, command_id: str) -> None:
        """Remove page id, cached statement, and related nav state."""
        from pages.statement_page import PALETTE_NAV_REQUESTED_KEY

        if command_id in self.command_ids:
            self.command_ids.remove(command_id)
        self.statement_cache.pop(command_id, None)
        if st.session_state.get(PALETTE_NAV_REQUESTED_KEY) == command_id:
            st.session_state.pop(PALETTE_NAV_REQUESTED_KEY, None)

    def prune_invalid(self) -> None:
        """Drop stale ids that no longer build a dynamic page."""
        self.command_ids = filter_command_ids(self.command_ids)
        valid_ids = set(self.command_ids)
        self.statement_cache = {
            command_id: statement
            for command_id, statement in self.statement_cache.items()
            if command_id in valid_ids
        }

    def update_dynamic_pages(
        self,
        static_pages: list[st.Page],
        *,
        app_dir: Path,
    ) -> list[st.Page]:
        """Prune, build st.Page objects, handle pending nav; return full page list."""
        from components.command_palette import PENDING_NAV_COMMAND_KEY

        self.prune_invalid()

        pages = list(static_pages)
        used_url_paths = {p.url_path for p in pages if p.url_path}
        command_pages: dict[str, st.Page] = {}

        for command_id in self.command_ids:
            page = build_dynamic_page(command_id)
            if page is None:
                continue
            page_fn, page_title = page
            url_path = _dynamic_page_url_path(command_id, used_url_paths)
            page_obj = st.Page(page_fn, title=page_title, icon="📄", url_path=url_path)
            pages.append(page_obj)
            command_pages[command_id] = page_obj

        pending_command = st.session_state.pop(PENDING_NAV_COMMAND_KEY, None)
        if pending_command and pending_command in command_pages:
            st.switch_page(command_pages[pending_command])

        return pages


def init_page_state() -> PageState:
    """Create and store PageState. Call once per session from Home.py."""
    state = PageState()
    st.session_state.dynamic_pages = state
    return state


def get_page_state() -> PageState:
    """Return the session's PageState (must already exist)."""
    state = st.session_state.get("dynamic_pages")

    if not state:
        raise RuntimeError(
            "PageState not initialized; call init_page_state() from Home.py first."
        )
    return state


def _dynamic_page_url_path(name: str, used: set[str]) -> str:
    """Unique url_path for a user-created page (avoids shared callable name 'render')."""
    base = re.sub(r"[^a-zA-Z0-9_-]+", "_", name.strip().lower()).strip("_") or "dynamic_page"
    candidate = base
    suffix = 2
    while candidate in used:
        candidate = f"{base}_{suffix}"
        suffix += 1
    used.add(candidate)
    return candidate
