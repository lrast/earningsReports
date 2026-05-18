"""Load and render front-end components from the project ``frontend/`` directory."""

from __future__ import annotations

import json
from pathlib import Path

import streamlit.components.v1 as components

FRONTEND_ROOT = Path(__file__).resolve().parents[2] / "frontend"
COMPONENTS_DIR = FRONTEND_ROOT / "components"

REACT_CDN = "https://unpkg.com/react@18/umd/react.production.min.js"
REACT_DOM_CDN = "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
BABEL_CDN = "https://unpkg.com/@babel/standalone/babel.min.js"

_COMPONENT_FILENAMES = ("component.mjs", "component.jsx", "component.js")
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
    return COMPONENTS_DIR / name


def list_components() -> list[str]:
    """Return names of components that have a recognized source file."""
    if not COMPONENTS_DIR.is_dir():
        return []
    names = []
    for path in sorted(COMPONENTS_DIR.iterdir()):
        if not path.is_dir():
            continue
        if any((path / filename).exists() for filename in _COMPONENT_FILENAMES):
            names.append(path.name)
    return names


def _component_script_path(name: str) -> Path:
    base = _component_dir(name)
    for filename in _COMPONENT_FILENAMES:
        path = base / filename
        if path.exists():
            return path
    raise FileNotFoundError(
        f"No component source in {base.relative_to(FRONTEND_ROOT.parent)} "
        f"(expected one of: {', '.join(_COMPONENT_FILENAMES)})"
    )


def _component_styles(name: str) -> str:
    css_path = _component_dir(name) / "component.css"
    if css_path.exists():
        return f"<style>\n{css_path.read_text(encoding='utf-8')}\n</style>"
    return ""


def load_component_source(name: str) -> str:
    """Read the source for a named component."""
    return _component_script_path(name).read_text(encoding="utf-8")


def _build_babel_component_html(name: str, script: str, props_json: str) -> str:
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
  <script crossorigin src="{REACT_CDN}"></script>
  <script crossorigin src="{REACT_DOM_CDN}"></script>
  <script crossorigin src="{BABEL_CDN}"></script>
  <script type="text/babel">
{script}
  </script>
</body>
</html>"""


def _build_esm_component_html(name: str, script: str, props_json: str) -> str:
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
  <script type="module">
{script}
  </script>
</body>
</html>"""


def build_component_html(name: str, *, props: dict | None = None) -> str:
    """Assemble a self-contained HTML document that mounts the component."""
    script_path = _component_script_path(name)
    script = script_path.read_text(encoding="utf-8")
    props_json = json.dumps(props or {})

    if script_path.suffix == ".mjs":
        return _build_esm_component_html(name, script, props_json)
    return _build_babel_component_html(name, script, props_json)


def render_frontend_component(
    name: str,
    *,
    height: int = 200,
    props: dict | None = None,
) -> None:
    """Render a named front-end component via ``st.components.v1.html``."""
    html = build_component_html(name, props=props)
    components.html(html, height=height)
