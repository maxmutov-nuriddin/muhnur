import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin";

// @netlify/vite-plugin applies netlify.toml headers in dev and ignores its `headers`
// option; the production CSP would block Vite's inline HMR scripts, so drop it locally.
const dropCspInDev = {
  name: "drop-csp-in-dev",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const setHeader = res.setHeader.bind(res);
      res.setHeader = (key, value) =>
        key.toLowerCase() === "content-security-policy" ? res : setHeader(key, value);
      next();
    });
  },
};

export default defineConfig({
  // netlify() runs netlify/functions/* and loads env vars inside `npm run dev`.
  // No edge functions in this project; skipping their Deno emulator keeps dev stable.
  plugins: [dropCspInDev, react(), netlify({ edgeFunctions: { enabled: false } })],
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        // Separate long-cached chunk for the 3D engine.
        manualChunks: (id) => (id.includes("node_modules/three/") ? "three" : undefined),
      },
    },
  },
  test: {
    environment: "node",
    include: ["**/*.test.js"],
    exclude: ["node_modules/**", "dist/**"],
  },
});
