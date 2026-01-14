import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server", // ⚡ Habilita SSR
  integrations: [
    react({
      client: "load", // React solo en cliente
    }),
  ],
  adapter: vercel({
    edge: false, // Serverless tradicional
  }),
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
