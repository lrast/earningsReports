"""Session-scoped container for loaded dynamic pages."""

from __future__ import annotations

import re
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path

import streamlit as st
import polars as pl

from utilities.parsed_command import ParsedCommand


@dataclass
class LoadedPage:
    parsed: ParsedCommand
    render_fn: Callable[[], None]
    title: str

    @property
    def command_id(self) -> str:
        return self.parsed["command_id"]


class OpenSheets:
    """State management for fetched statement pages."""
    def __init__(self) -> None:
        self.pages: list[LoadedPage] = []
        self.statement_cache: dict[str, object] = {}
        self.pending_nav: str | None = None
        self.last_navigated_command_id: str | None = None

    def has_page(self, command_id: str) -> bool:
        return any(page.command_id == command_id for page in self.pages)

    def add_page(
        self,
        parsed: ParsedCommand,
        render_fn: Callable[[], None],
        title: str,
    ) -> bool:
        """Register a built page. Returns True if present or newly added."""
        command_id = parsed["command_id"]
        if self.has_page(command_id):
            return True
        self.pages.append(LoadedPage(parsed=parsed, render_fn=render_fn, title=title))
        return True

    def get_statement(self, command_id: str) -> object | None:
        return self.statement_cache.get(command_id)

    def set_statement(self, command_id: str, statement: object) -> None:
        self.statement_cache[command_id] = statement

    def request_navigation(self, command_id: str) -> None:
        """Queue navigation after dynamic pages are registered in st.navigation."""
        if command_id != self.last_navigated_command_id:
            self.pending_nav = command_id

    def consume_pending_navigation(self) -> str | None:
        pending = self.pending_nav
        self.pending_nav = None
        return pending

    def delete_page(self, command_id: str) -> None:
        """Remove page, cached statement, and related nav state."""
        self.pages = [page for page in self.pages if page.command_id != command_id]
        self.statement_cache.pop(command_id, None)
        if self.pending_nav == command_id:
            self.pending_nav = None
        if self.last_navigated_command_id == command_id:
            self.last_navigated_command_id = None

    def update_dynamic_pages(
        self,
        static_pages: dict[str, list[st.Page]],
        *,
        app_dir: Path,
    ) -> dict[str, list[st.Page]]:
        """Wrap loaded pages as st.Page objects, handle pending nav; return full page list."""
        pages = {group: list(group_pages) for group, group_pages in static_pages.items()}
        used_url_paths = {
            p.url_path
            for group_pages in pages.values()
            for p in group_pages
            if p.url_path
        }
        command_pages: dict[str, st.Page] = {}
        data_sheets = pages.setdefault("Data Sheets", [])

        for loaded in self.pages:
            url_path = _dynamic_page_url_path(loaded.command_id, used_url_paths)
            page_obj = st.Page(
                loaded.render_fn,
                title=loaded.title,
                icon="📄",
                url_path=url_path,
            )
            data_sheets.append(page_obj)
            command_pages[loaded.command_id] = page_obj

        pending_command = self.consume_pending_navigation()
        if pending_command and pending_command in command_pages:
            self.last_navigated_command_id = pending_command
            st.switch_page(command_pages[pending_command])

        return pages


class DataSelections:
    """State management for user data filter and selection choices."""

    DEFAULT_SELECTED_COLUMNS: tuple[str, ...] = (
        "Assets",
        "Liabilities",
        "Revenues",
        "Gross Profit",
        "Entity Public Float",
        "Stockholders' Equity Attributable to Parent",
        "Cost of Revenue",
    )

    def __init__(self) -> None:
        self.selected_columns: list[str] = list(self.DEFAULT_SELECTED_COLUMNS)
        self.selected_ciks: set[int] = set()

    def cik_filter_expression(self) -> pl.Expr | bool:
        """Polars filter keeping only selected CIKs; no-op when none are selected."""
        if not self.selected_ciks:
            return False
        return pl.col("cik").is_in(list(self.selected_ciks))

    def with_select_column(
        self, frame: pl.DataFrame, columns: list[str]
    ) -> pl.DataFrame:
        """Add checkbox Select column and reorder for data_editor display."""
        return (
            frame
            .with_columns(pl.col("cik").is_in(list(self.selected_ciks)).alias("Select"))
            .select(["Select", "cik", "company", "tickers", *columns])
        )

    def sync_from_editor(self, edited_df: object) -> bool:
        """Update selected_ciks from editor output; return True if changed."""
        if isinstance(edited_df, pl.DataFrame):
            checked_ciks = set(edited_df.filter(pl.col("Select"))["cik"].to_list())
        else:
            checked_ciks = set(edited_df.loc[edited_df["Select"], "cik"])

        if checked_ciks == self.selected_ciks:
            return False
        self.selected_ciks = checked_ciks
        return True


def init_page_state() -> OpenSheets:
    """Create and store OpenSheets. Call once per session from Home.py."""
    state = OpenSheets()
    st.session_state.dynamic_pages = state
    st.session_state.data_selection = DataSelections()
    return state


def get_dynamic_pages() -> OpenSheets:
    """Return the session's OpenSheets (must already exist)."""
    state = st.session_state.get("dynamic_pages")

    if not state:
        raise RuntimeError(
            "OpenSheets not initialized; call init_page_state() from Home.py first."
        )
    return state


def get_data_selection() -> DataSelections:
    """Return the session's DataSelections (must already exist)."""
    state = st.session_state.get("data_selection")

    if not state:
        raise RuntimeError(
            "DataSelections not initialized; call init_page_state() from Home.py first."
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
