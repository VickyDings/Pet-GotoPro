// ============================================================
// STANDALONE ARTICLES — Single Source of Truth
// ============================================================
// Articles authored as standalone HTML files in `public/guides/...`
// (i.e. NOT in the Astro content collection).
//
// Why this file exists:
// Standalone HTML bypasses the Decap CMS / content collection pipeline,
// which is great for design control but means Astro's `getCollection()`
// can't find these articles. Every page that needs to list, count, or
// surface guides reads from here.
//
// Add a new article: drop an entry under the matching category slug.
// (cats, dogs, birds, reptiles, aquatics, small-animals)
// The new article will automatically appear on:
//   • Homepage → "Fresh From the Guides"
//   • /guides/ hub → counted under its category
//   • /guides/{pet}/ category page → rendered as a card
// ============================================================

export const standaloneArticles = {
  cats: [
    {
      url: '/guides/cats/ragdoll-cat-guide/',
      pet: 'cats',
      title: 'Ragdoll Cat Complete Care Guide: Temperament, Health, and the Best Products for 2026',
      description: 'Everything new and prospective Ragdoll owners need to know — temperament, lifespan, grooming, health concerns, and the products that genuinely serve this gentle, oversized breed.',
      heroImage: '/uploads/ragdoll-44.jpg',
      heroImageAlt: 'Adult Ragdoll cat with striking blue eyes and soft white-and-cream semi-long fur',
      pubDate: new Date('2026-05-16'),
    },
    {
      url: '/guides/cats/nutrition/wet-vs-dry-cat-food/',
      pet: 'cats',
      title: 'Wet vs Dry Cat Food: Which Is Actually Better in 2026?',
      description: 'The real differences between wet and dry food — hydration, protein quality, carb load, dental impact — and the 8 specific products that deliver in each category across price tiers.',
      heroImage: '/uploads/ragdoll-208.jpg',
      heroImageAlt: 'Adult cat resting peacefully in a relaxed pose',
      pubDate: new Date('2026-05-17'),
    },
  ],
  dogs: [],
  birds: [],
  reptiles: [],
  aquatics: [],
  'small-animals': [],
};

// Flat array of all standalone articles across every category.
// Used by the homepage to surface the newest guides regardless of pet.
export const allStandaloneArticles = Object.values(standaloneArticles).flat();

// How many standalone articles exist for a given pet slug.
// Used by the /guides/ hub to show accurate per-category counts.
export function standaloneCountForPet(petSlug) {
  return (standaloneArticles[petSlug] || []).length;
}
