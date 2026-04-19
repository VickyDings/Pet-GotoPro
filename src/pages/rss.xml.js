// ============================================================
// RSS FEED GENERATOR
// ============================================================
// This file generates an RSS feed at /rss.xml containing all
// your recent posts across reviews, guides, and news. RSS
// (Really Simple Syndication) is an old but still-valuable
// technology that lets readers subscribe to your site in
// feed readers like Feedly, NetNewsWire, or Inoreader.
//
// Why maintain an RSS feed in 2026? Three reasons: (1) your
// most loyal readers often prefer RSS to email, (2) Google
// and other platforms sometimes use RSS feeds to discover
// new content, and (3) it's essentially free to generate
// because Astro does all the work.
// ============================================================

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts.js';

export async function GET(context) {
  // Pull together all published posts from all collections
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  const news = await getCollection('news', ({ data }) => !data.draft);

  // Normalize them into a single list with consistent fields
  const allPosts = [
    ...reviews.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/reviews/${p.data.pet}/${p.slug}/`,
    })),
    ...guides.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/guides/${p.data.pet}/${p.slug}/`,
    })),
    ...news.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/news/${p.slug}/`,
    })),
  ];

  // Sort newest first and take the 30 most recent
  const sortedPosts = allPosts
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf())
    .slice(0, 30);

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: sortedPosts,
    customData: `<language>en-us</language>`,
  });
}
