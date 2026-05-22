"""Global Streamlit layout: page config, navigation, and shared styles."""

from __future__ import annotations

from pathlib import Path

import streamlit as st

APP_DIR = Path(__file__).resolve().parent
ASSETS_DIR = APP_DIR / "assets"
CSS_DIR = ASSETS_DIR / "css"
JS_DIR = ASSETS_DIR / "js"
APP_TITLE = "Corporate Earnings"
PAGE_ICON = "📈"
GLOBAL_JS_BUNDLES = ("main.js",)

_SESSION_CONFIG_KEY = "_app_template_configured"
_SESSION_JS_KEY = "_app_frontend_js"
_JS_COMPONENTS: dict[str, st.components.v2.types.ComponentRenderer] = {}


def init_page(
    caller_file: str | None = None,
    *,
    pinned_right_sidebar: bool = False,
) -> None:
    """Apply global page config, layout CSS, and sidebar branding.

    Call at the top of every page module. When a non-home page is run directly
    (``streamlit run app/TableView.py``), navigation is started automatically.

    Set ``pinned_right_sidebar=True`` on pages that use a fixed right-hand column
    (e.g. TableView filter controls).
    """
    _ensure_page_config()
    _inject_global_css()
    _inject_global_js()
    if pinned_right_sidebar:
        st.markdown(_load_css("pinned_right_sidebar.css"), unsafe_allow_html=True)
    _render_sidebar_branding()

    if caller_file is None:
        return

    script_path = Path(caller_file).resolve()
    if _is_entry_script(script_path) and script_path.name != "Home.py":
        run_navigation()


def run_navigation(home=None) -> None:
    """Run the app navigation sidebar (call from the entrypoint page)."""
    build_navigation(home=home).run()


def build_navigation(home=None):
    """Build ``st.navigation`` from :data:`NAV_ITEMS`."""
    NAV_ITEMS: list[dict] = [
                                {
                                    "file": "Home.py",
                                    "title": "Home",
                                    "icon": "🏠",
                                    "default": True,
                                },
                                {
                                    "file": "TableView.py",
                                    "title": "Yearly Financials",
                                    "icon": "📊",
                                },
                                {
                                    "file": "general_doc_view.py",
                                    "title": "General Doc View",
                                    "icon": "📄",
                                },
                                {
                                    "file": "test_doc_view.py",
                                    "title": "Test Doc View",
                                    "icon": "🧪",
                                },
                            ]
    pages = []

    for item in NAV_ITEMS:
        path = APP_DIR / item["file"]
        if item["file"] == "Home.py" and home is not None:
            pages.append(
                st.Page(
                    home,
                    title=item["title"],
                    icon=item["icon"],
                    default=item.get("default", False),
                )
            )
        else:
            pages.append(
                st.Page(
                    str(path),
                    title=item["title"],
                    icon=item["icon"],
                    default=item.get("default", False),
                )
            )
    return st.navigation(pages)


def _is_entry_script(script_path: Path) -> bool:
    try:
        from streamlit.runtime.scriptrunner import get_script_run_ctx

        ctx = get_script_run_ctx()
        if ctx is None or ctx.main_script_path is None:
            return False
        return Path(ctx.main_script_path).resolve() == script_path.resolve()
    except Exception:
        return False


def _ensure_page_config() -> None:
    if st.session_state.get(_SESSION_CONFIG_KEY):
        return
    st.set_page_config(
        page_title=APP_TITLE,
        page_icon=PAGE_ICON,
        layout="wide",
        initial_sidebar_state="expanded",
    )
    st.session_state[_SESSION_CONFIG_KEY] = True


def _load_css(filename: str) -> str:
    """Read a CSS file from ``assets/css`` and wrap it for ``st.markdown``."""
    rules = (CSS_DIR / filename).read_text(encoding="utf-8").strip()
    return f"<style>\n{rules}\n</style>"


def _read_js_asset(filename: str) -> str:
    """Read built JavaScript from ``assets/js`` (Vite output)."""
    return (JS_DIR / filename).read_text(encoding="utf-8").strip()


def _js_component(name: str, filename: str) -> st.components.v2.types.ComponentRenderer:
    """Register a v2 component backed by a file in ``assets/js``."""
    if name not in _JS_COMPONENTS:
        _JS_COMPONENTS[name] = st.components.v2.component(
            name,
            js=_read_js_asset(filename),
            isolate_styles=False,
        )
    return _JS_COMPONENTS[name]


def _inject_global_js() -> None:
    if st.session_state.get(_SESSION_JS_KEY):
        return
    for filename in GLOBAL_JS_BUNDLES:
        stem = Path(filename).stem
        mount = _js_component(f"corporate_earnings_{stem}", filename)
        mount(key=f"_app_js_{stem}", height=0)
    st.session_state[_SESSION_JS_KEY] = True


def _inject_global_css() -> None:
    st.markdown(_load_css("global.css"), unsafe_allow_html=True)


def _render_sidebar_branding() -> None:
    if st.session_state.get("_app_sidebar_branding"):
        return
    with st.sidebar:
        st.markdown(f"### {APP_TITLE}")
        st.caption("SEC filings & financial tables")
    st.session_state["_app_sidebar_branding"] = True
