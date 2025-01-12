import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'laserwave',
    },
  },
  site: "https://wwww.balintkissdev.com",
  vite: {
    server: {
      watch: {
        // Stop Astro from crashing when my editor makes a backup file
        ignored: ['*.astro~', '*.md~'],
      },
    }
  },
});
