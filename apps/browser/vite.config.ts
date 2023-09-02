import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Web Highlighter",
  version: "1.0.0",
  permissions: [],
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content.tsx"],
    },
  ],
  action: {
    default_popup: "index.html",
  },
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
