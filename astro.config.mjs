import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  adapter: vercel({ edge: false }),
  output: "server",
  integrations: [
    react({
      client: "load", // React solo en cliente
    }),
  ],
  vite: {
    resolve: {
      alias: { "@": "/src" },
    },
  },
});
