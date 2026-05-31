import { copyFileSync, existsSync, mkdirSync, renameSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const frontendDir = fileURLToPath(new URL(".", import.meta.url));
const assetsJsDir = resolve(frontendDir, "../app/assets/js");
const assetsCssDir = resolve(frontendDir, "../app/assets/css");

/** Lib builds emit CSS beside JS; move it to ``app/assets/css`` after each build. */
function movePaletteCssToAssetsCss() {
  return {
    name: "move-palette-css-to-assets-css",
    closeBundle() {
      const from = resolve(assetsJsDir, "command_palette.css");
      const to = resolve(assetsCssDir, "command_palette.css");
      if (!existsSync(from)) {
        return;
      }
      mkdirSync(assetsCssDir, { recursive: true });
      renameSync(from, to);
    },
  };
}

/** Copy command JSON beside the built bundle for Python label lookup. */
function copyCommandPaletteJson() {
  return {
    name: "copy-command-palette-json",
    closeBundle() {
      const from = resolve(frontendDir, "src/command_palette_commands.json");
      const to = resolve(assetsJsDir, "command_palette_commands.json");
      if (!existsSync(from)) {
        return;
      }
      mkdirSync(assetsJsDir, { recursive: true });
      copyFileSync(from, to);
    },
  };
}

export default defineConfig({
  plugins: [react(), movePaletteCssToAssetsCss(), copyCommandPaletteJson()],
  // React/kbar reference process.env.NODE_ENV; Streamlit runs the bundle in a browser.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    process: JSON.stringify({ env: { NODE_ENV: "production" } }),
  },
  build: {
    outDir: assetsJsDir,
    emptyOutDir: true,
    lib: {
      entry: resolve(frontendDir, "src/main.jsx"),
      formats: ["es"],
      fileName: "command_palette",
    },
  },
});
