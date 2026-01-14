import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server", // necesario para SSR
  adapter: vercel({ edge: false }), // serverless tradicional
  integrations: [react({ client: "load" })],
});
