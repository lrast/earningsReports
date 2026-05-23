import streamlit as st

from pathlib import Path

ASSET_DIR = Path(__file__).resolve().parent.parent / 'assets'


def load_css(filename: str) -> str:
    """Read a CSS file from ``assets/css`` and wrap it for ``st.markdown``."""
    rules = (ASSET_DIR / "css" / filename).read_text(encoding="utf-8").strip()
    return f"<style>\n{rules}\n</style>"


def load_js_component(name, filename: str):
    """Register a v2 component backed by a file in ``assets/js``."""
    raw_code = (ASSET_DIR / "js" / filename).read_text(encoding="utf-8").strip()

    return st.components.v2.component(
            name,
            js=raw_code,
            isolate_styles=False,
        )
