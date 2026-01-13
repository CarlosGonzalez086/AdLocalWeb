import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": "/src", // equivale a src/
      },
    },
  },
  integrations: [
    react({
      client: "load", // Renderiza todos los componentes React en cliente
    }),
  ],
  output: "server",
  adapter: vercel(), // <-- Adaptador Vercel serverless
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    host: true,
  },
});
