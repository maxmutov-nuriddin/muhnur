import { defineConfig, loadEnv } from "vite";
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

// Netlify serves public/xizmatlar/<slug>/index.html for "/xizmatlar/<slug>/";
// Vite dev would fall back to the SPA instead, so mirror Netlify locally.
const serveStaticPageDirs = {
  name: "serve-static-page-dirs",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (/^\/xizmatlar\/[a-z0-9-]+\/$/.test(req.url ?? "")) req.url += "index.html";
      next();
    });
  },
};

// @netlify/vite-plugin reads function env only from process.env and the linked
// Netlify site, never from .env; Vite loads only VITE_* vars. Bridge the
// server-only keys so `npm run dev` sees them. Real env vars still win.
const SERVER_ENV_PREFIX = "TELEGRAM_";
function loadServerEnv(mode) {
  const fileEnv = loadEnv(mode, process.cwd(), SERVER_ENV_PREFIX);
  for (const [key, value] of Object.entries(fileEnv)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

export default defineConfig(({ mode }) => {
  loadServerEnv(mode);
  return config;
});

const config = {
  // netlify() runs netlify/functions/* and loads env vars inside `npm run dev`.
  // No edge functions in this project; skipping their Deno emulator keeps dev stable.
  plugins: [dropCspInDev, serveStaticPageDirs, react(), netlify({ edgeFunctions: { enabled: false } })],
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
};
