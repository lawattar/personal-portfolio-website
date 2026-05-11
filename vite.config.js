import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { portfolioImagesManifestPlugin } from "./scripts/manifest-utils.mjs";

export default defineConfig({
  plugins: [portfolioImagesManifestPlugin()],
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("./index.html", import.meta.url)),
        projects: fileURLToPath(new URL("./projects.html", import.meta.url)),
      },
    },
  },
});
