// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// This file tells Astro how to build your site. When you edit this file,
// you are essentially giving Astro its marching orders. The most important
// line below is the 'site' URL — this is what Astro uses to generate
// absolute URLs in the sitemap, RSS feed, and canonical tags. When you
// deploy, this MUST match your real domain or SEO will break.

export default defineConfig({
  // Your live site URL. Astro uses this to build absolute URLs in the
  // sitemap and RSS feed. Do not change this unless you change domains.
  site: 'https://pet-gotopro.com',

  // The integrations array activates optional Astro features. Sitemap
  // creates /sitemap-index.xml automatically; MDX lets you use components
  // inside Markdown files if you ever want to.
  integrations: [
    sitemap({
      // Split the sitemap by content type so Google can crawl efficiently
      filter: (page) => !page.includes('/admin') && !page.includes('/out/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    mdx(),
  ],

  // Build settings. 'directory' means each page gets its own folder with
  // an index.html inside — this produces cleaner URLs like /reviews/cats/
  // instead of /reviews/cats.html
  build: {
    format: 'directory',
  },

  // Image optimization settings. Astro will automatically convert your
  // product photos to modern formats for faster loading.
  image: {
    // We let Astro use Sharp (installed via package.json) to process images
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  // Markdown rendering settings
  markdown: {
    // Shiki provides syntax highlighting if you ever show code in posts
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
