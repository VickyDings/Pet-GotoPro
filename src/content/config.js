// ============================================================
// CONTENT SCHEMAS — The Quality Inspector
// ============================================================
// Every time you write a post, it has a "frontmatter" block at
// the top (the stuff between two --- lines) with metadata like
// title, description, publish date, author, etc. This file
// defines what fields each type of post MUST have, what fields
// are optional, and what type each field should be.
//
// Why does this matter? Two reasons:
// 1. If you accidentally forget the publish date on a post, or
//    typo the pet category, Astro will refuse to build and will
//    tell you exactly which file has the problem. This prevents
//    broken posts from going live.
// 2. TypeScript autocomplete in your code editor knows exactly
//    what fields each post has, so you can't misspell field names.
// ============================================================

import { defineCollection, z } from 'astro:content';

// ------------------------------------------------------------
// REVIEWS COLLECTION
// ------------------------------------------------------------
// Every file inside src/content/reviews/{pet}/ must have these fields
// in its frontmatter. Reviews are commercial affiliate articles about
// specific products.
// ------------------------------------------------------------

const reviews = defineCollection({
  type: 'content', // Markdown content (as opposed to data files)
  schema: ({ image }) =>
    z.object({
      // Required — the article's headline
      title: z.string().min(10).max(100),

      // Required — the 1-2 sentence summary that appears in listings
      // and in search engine results. 140-160 characters is ideal.
      description: z.string().min(80).max(200),

      // Required — the hero image at the top of the article.
      // Use Astro's image() validator so the image is automatically
      // optimized during build.
      heroImage: image(),

      // Required alt text for the hero image (accessibility + SEO)
      heroImageAlt: z.string(),

      // Required — the pet this review is about. Must match a slug
      // from PET_CATEGORIES in consts.js.
      pet: z.enum([
        'dogs',
        'cats',
        'birds',
        'reptiles',
        'aquatics',
        'small-animals',
      ]),

      // Required — when the post was first published
      pubDate: z.coerce.date(),

      // Optional — when the post was last updated. Shown in the
      // byline as "Updated: [date]" which signals freshness to Google.
      updatedDate: z.coerce.date().optional(),

      // Required — the author's slug (must match a file in
      // src/content/authors/). Used to link to the author page.
      author: z.string().default('editorial-team'),

      // Optional — the veterinary reviewer for health content
      vetReviewer: z.string().optional(),

      // Optional — marks a post as featured on the homepage
      featured: z.boolean().default(false),

      // Optional — marks a post as a draft (won't appear on the live site)
      draft: z.boolean().default(false),

      // Optional — tags for cross-referencing (e.g., "senior-pet",
      // "budget", "luxury"). Used to build related-posts lists.
      tags: z.array(z.string()).default([]),

      // Optional — for listicle reviews, the number of products covered
      productCount: z.number().optional(),
    }),
});

// ------------------------------------------------------------
// GUIDES COLLECTION
// ------------------------------------------------------------
// Guides are informational articles (how-to, care sheets, explainers).
// Same schema as reviews except without the productCount field.
// ------------------------------------------------------------

const guides = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string().min(10).max(100),
      description: z.string().min(80).max(200),
      heroImage: image(),
      heroImageAlt: z.string(),
      pet: z.enum([
        'dogs',
        'cats',
        'birds',
        'reptiles',
        'aquatics',
        'small-animals',
      ]),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('editorial-team'),
      vetReviewer: z.string().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),

      // Guide-specific — estimated reading time in minutes
      readingTime: z.number().optional(),
    }),
});

// ------------------------------------------------------------
// NEWS COLLECTION
// ------------------------------------------------------------
// News posts are time-sensitive announcements — product recalls,
// industry developments, new product launches. They don't have a
// specific pet category because they may span multiple.
// ------------------------------------------------------------

const news = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string().min(10).max(100),
      description: z.string().min(80).max(200),
      heroImage: image(),
      heroImageAlt: z.string(),
      pubDate: z.coerce.date(),
      author: z.string().default('editorial-team'),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),

      // News posts can span multiple pets
      pets: z
        .array(
          z.enum([
            'dogs',
            'cats',
            'birds',
            'reptiles',
            'aquatics',
            'small-animals',
          ])
        )
        .default([]),

      // Urgency level — drives styling of news cards
      urgency: z.enum(['info', 'alert', 'breaking']).default('info'),
    }),
});

// ------------------------------------------------------------
// AUTHORS COLLECTION
// ------------------------------------------------------------
// Author profiles are the foundation of Google's E-E-A-T signals
// (Experience, Expertise, Authoritativeness, Trust). Every post
// links to an author page, and every author page shows credentials.
// ------------------------------------------------------------

const authors = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),

      // Professional role (e.g., "Founder & Editor", "Veterinary Reviewer")
      role: z.string(),

      // Short bio for the author card (appears under articles)
      shortBio: z.string().max(300),

      // Professional photo
      photo: image(),

      // Professional credentials (DVM, CPDT-KA, etc.)
      credentials: z.array(z.string()).default([]),

      // Years of experience in the pet industry
      yearsExperience: z.number().optional(),

      // Specialty areas (e.g., "Feline behavior", "Reptile husbandry")
      specialties: z.array(z.string()).default([]),

      // Links to outside profiles (builds trust signals for Google)
      links: z
        .object({
          email: z.string().optional(),
          linkedin: z.string().url().optional(),
          website: z.string().url().optional(),
          twitter: z.string().url().optional(),
        })
        .optional(),
    }),
});

// ------------------------------------------------------------
// EXPORT ALL COLLECTIONS
// ------------------------------------------------------------
// Astro reads this export and uses it to enforce the schemas.
// ------------------------------------------------------------

export const collections = {
  reviews,
  guides,
  news,
  authors,
};
