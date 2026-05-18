"""Load and render front-end components built into ``app/static/dist``."""

from __future__ import annotations

import json
from pathlib import Path

import streamlit.components.v1 as components

DIST_ROOT = Path(__file__).resolve().parent.parent / "static" / "dist"
_COMPONENT_FILENAMES = ("component.js",)
_BASE_STYLES = """
    body {
      margin: 0;
      font-family: "Source Sans Pro", sans-serif;
      color: #fafafa;
      background: transparent;
    }
    #root {
      min-height: 1px;
    }
"""


def _component_dir(name: str) -> Path:
    return DIST_ROOT / name


def _component_script_path(name: str) -> Path:
    base = _component_dir(name)
    for filename in _COMPONENT_FILENAMES:
        path = base / filename
        if path.exists():
            return path
    raise FileNotFoundError(
        f"No built component in {base.relative_to(DIST_ROOT.parent.parent)} "
        f"(expected one of: {', '.join(_COMPONENT_FILENAMES)}). "
        "Run `npm run build` from the `frontend/` directory."
    )


def _component_styles(name: str) -> str:
    css_path = _component_dir(name) / "component.css"
    if css_path.exists():
        return f"<style>\n{css_path.read_text(encoding='utf-8')}\n</style>"
    return ""


def _build_component_html(name: str, script: str, props_json: str) -> str:
    extra_styles = _component_styles(name)
    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>{_BASE_STYLES}</style>
  {extra_styles}
</head>
<body>
  <div id="root"></div>
  <script>window.__STREAMLIT_PROPS__ = {props_json};</script>
  <script>
{script}
  </script>
</body>
</html>"""


def render_frontend_component(
    name: str,
    *,
    height: int = 200,
    props: dict | None = None,
) -> None:
    """Render a named front-end component via ``st.components.v1.html``."""
    script = _component_script_path(name).read_text(encoding="utf-8")
    props_json = json.dumps(props or {})
    html = _build_component_html(name, script, props_json)
    components.html(html, height=height)
