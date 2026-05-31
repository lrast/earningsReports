/**
 * Global command palette for Streamlit (mounted via components/command_palette.py).
 * Must export a default function — required by st.components.v2.component.
 */

import { createRoot } from "react-dom/client";
import CommandPalette from "./CommandPalette.jsx";

let latestComponent = null;
let root = null;

export default function (component) {
  latestComponent = component;

  if (!root) {
    const rootEl = document.createElement("div");
    rootEl.id = "ce-command-palette-root";
    document.body.appendChild(rootEl);
    root = createRoot(rootEl);
  }

  root.render(<CommandPalette getComponent={() => latestComponent} />);
}
