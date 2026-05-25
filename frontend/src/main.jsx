/**
 * Global command palette for Streamlit (mounted via components/command_palette.py).
 * Must export a default function — required by st.components.v2.component.
 */

import { createRoot } from "react-dom/client";
import CommandPalette from "./CommandPalette.jsx";

let latestComponent = null;
let mounted = false;

export default function (component) {
  latestComponent = component;

  if (mounted) {
    return;
  }

  mounted = true;

  const rootEl = document.createElement("div");
  rootEl.id = "ce-command-palette-root";
  document.body.appendChild(rootEl);

  createRoot(rootEl).render(
    <CommandPalette getComponent={() => latestComponent} />
  );
}
