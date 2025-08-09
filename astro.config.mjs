import { defineConfig } from "astro/config"

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://kunver.dev",
  integrations: [sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
})