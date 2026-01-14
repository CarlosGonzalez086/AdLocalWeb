import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server", // necesario para SSR en Vercel
  integrations: [
    react({
      client: "load", // React solo en cliente
    }),
  ],
  adapter: vercel({
    edge: false, // serverless tradicional, no Edge
  }),
});
