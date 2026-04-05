import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'laserwave',
    },
  },
  site: "https://www.balintkissdev.com",
  vite: {
    plugins: [
        tailwindcss()
    ],
    server: {
      watch: {
        // Stop Astro from crashing when my editor makes a backup file
        ignored: ['*.astro~', '*.md~'],
      },
    }
  },
});
