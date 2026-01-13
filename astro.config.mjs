import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  integrations: [
    react({
      client: "load",
    }),
  ],
  output: "server",
  adapter: vercel(),
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    host: true,
  },
});
