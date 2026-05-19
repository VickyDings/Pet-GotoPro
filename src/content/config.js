// ============================================================
// CONTENT SCHEMAS — UPDATED FOR RICH ADMIN AUTHORING
// ============================================================
// The guides schema now supports structured products and FAQs
// authored through Decap CMS, while remaining backward-compatible
// with existing guides that only have a title + body.
// ============================================================

import { defineCollection, z } from 'astro:content';

// ------------------------------------------------------------
// PRODUCT SUB-SCHEMA (used inside guides)
// ------------------------------------------------------------
// Each product card in a guide. Author provides EITHER an
// affiliateUrl (full SiteStripe URL) OR an asin (10-character
// Amazon product ID). The template resolves whichever is set.
// ------------------------------------------------------------

const productSchema = ({ image }) =>
  z
    .object({
      title: z.string(),
      badge: z.string().optional(),
      image: image(),
      imageAlt: z.string(),
      description: z.string(),
      affiliateUrl: z.string().url().optional(),
      asin: z
        .string()
        .regex(/^[A-Z0-9]{10}$/, 'ASIN must be 10 uppercase alphanumeric characters')
        .optional(),
      priceNote: z
        .string()
        .default('*Price subject to change. International links work via Amazon OneLink.'),
    })
    .refine((d) => d.affiliateUrl || d.asin, {
      message: 'Each product needs either an affiliateUrl OR an asin',
      path: ['affiliateUrl'],
    });

// ------------------------------------------------------------
// FAQ SUB-SCHEMA
// ------------------------------------------------------------

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

// ------------------------------------------------------------
// GUIDES COLLECTION (now with rich structured fields)
// ------------------------------------------------------------

const guides = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // === Core required ===
      title: z.string().min(10).max(120),
      description: z.string().min(60).max(220),
      pet: z.enum([
        'dogs',
        'cats',
        'birds',
        'reptiles',
        'aquatics',
        'small-animals',
      ]),
      pubDate: z.coerce.date(),
      heroImage: image(),
      heroImageAlt: z.string(),

      // === Optional metadata ===
      guide_type: z
        .enum([
          'care-guide',
          'breed-guide',
          'nutrition',
          'behavior',
          'health',
          'training',
          'habitat-setup',
        ])
        .default('care-guide'),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('editorial-team'),
      vetReviewer: z.string().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      readingTime: z.number().int().min(1).max(60).optional(),

      // === Optional content fields ===
      heroImageCaption: z.string().optional(),
      lede: z.string().optional(),

      // === Structured product cards ===
      products: z.array(productSchema({ image })).default([]),

      // === FAQ section ===
      faqs: z.array(faqSchema).default([]),
    }),
});

// ------------------------------------------------------------
// REVIEWS COLLECTION (unchanged from original)
// ------------------------------------------------------------

const reviews = defineCollection({
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
      productCount: z.number().optional(),
    }),
});

// ------------------------------------------------------------
// NEWS COLLECTION (unchanged)
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
      urgency: z.enum(['info', 'alert', 'breaking']).default('info'),
    }),
});

// ------------------------------------------------------------
// AUTHORS COLLECTION (unchanged)
// ------------------------------------------------------------

const authors = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      shortBio: z.string().max(300),
      photo: image(),
      credentials: z.array(z.string()).default([]),
      yearsExperience: z.number().optional(),
      specialties: z.array(z.string()).default([]),
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

export const collections = {
  reviews,
  guides,
  news,
  authors,
};
