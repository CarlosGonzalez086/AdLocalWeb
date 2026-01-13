import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// Configuración final para Vercel Serverless + React + Bootstrap + Leaflet
export default defineConfig({
  output: "server", // Habilita SSR
  integrations: [
    react({
      client: "load", // Solo carga React en cliente
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": "/src", // Alias para imports
      },
    },
  },
  adapter: vercel({
    edge: false, // Forzar serverless tradicional (no Edge)
  }),
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    host: true,
  },
});
