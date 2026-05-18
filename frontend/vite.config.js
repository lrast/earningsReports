import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const COMPONENTS_DIR = resolve(__dirname, "components");
const DIST_DIR = resolve(__dirname, "../app/static/dist");

const COMPONENT_FILENAMES = ["component.jsx", "component.tsx", "component.js"];

function discoverComponentEntries() {
  const entries = {};

  for (const dirent of readdirSync(COMPONENTS_DIR, { withFileTypes: true })) {
    if (!dirent.isDirectory()) {
      continue;
    }

    const componentDir = join(COMPONENTS_DIR, dirent.name);
    for (const filename of COMPONENT_FILENAMES) {
      const entry = join(componentDir, filename);
      if (existsSync(entry)) {
        entries[dirent.name] = entry;
        break;
      }
    }
  }

  return entries;
}

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: DIST_DIR,
    emptyOutDir: true,
    rollupOptions: {
      input: discoverComponentEntries(),
      output: {
        format: "iife",
        name: "StreamlitComponent",
        entryFileNames: "[name]/component.js",
        assetFileNames: "[name]/component[extname]",
        inlineDynamicImports: true,
      },
    },
  },
});
