// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server", // SSR
  adapter: vercel({ edge: false }), // Serverless Node
  integrations: [react({ client: "load" })],
  vite: { resolve: { alias: { "@": "/src" } } },
});
