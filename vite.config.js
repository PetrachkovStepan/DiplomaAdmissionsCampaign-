/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: `${path.resolve(__dirname, "./src/components")}`,
      api: `${path.resolve(__dirname, "./src/api")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      hooks: `${path.resolve(__dirname, "./src/hooks")}`,
      provider: `${path.resolve(__dirname, "./src/provider")}`,
      routes: `${path.resolve(__dirname, "./src/routes")}`,
    },
  },
});
