import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const frontendDir = fileURLToPath(new URL(".", import.meta.url));
const assetsJsDir = resolve(frontendDir, "../app/assets/js");

export default defineConfig({
  build: {
    outDir: assetsJsDir,
    emptyOutDir: true,
    lib: {
      entry: resolve(frontendDir, "src/main.js"),
      formats: ["es"],
      fileName: "main",
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
