// ============================================================
// SITE CONSTANTS — The Control Panel of Pet-GoToPro
// ============================================================
// This file holds settings used throughout the entire site.
// When you want to change something site-wide — a menu item,
// a tagline, your contact email — you come HERE and edit it
// in ONE place, and the change appears everywhere automatically.
//
// Why is this so important? Imagine your site has 200 pages and
// you want to change "Get trusted information from the Pet Pros"
// to "Trusted pet advice, every day." Without a constants file,
// you would have to edit all 200 pages one by one. With this
// file, you edit the tagline once and all 200 pages update on
// the next rebuild. This is the single biggest reason why Astro
// is easier to maintain than plain HTML for a growing site.
// ============================================================

export const SITE = {
  // Your brand identity
  name: "Pet-GoToPro",
  fullName: "Pet-Go'to'Pro",
  tagline: "Get trusted information from the Pet Pros",
  description:
    "Expert pet product reviews and care guides for dogs, cats, birds, reptiles, aquatics, and small animals. Trusted, tested, and always in your pet's best interest.",

  // Your contact details
  email: "contact@pet-gotopro.com",

  // Your Amazon Associates affiliate tag. This is used by the helper
  // function below to build every Amazon link on your site. If you
  // ever change your tag, you only change it here.
  amazonTag: "bizco057-20",

  // The year your site was founded (appears in the footer copyright)
  foundedYear: 2026,

  // Social media handles. Leave as empty strings if you don't have them
  // yet — the footer will simply not show icons for empty handles.
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    pinterest: "",
    twitter: "",
  },
};

// ============================================================
// NAVIGATION — The site's main menu
// ============================================================
// This array defines the top navigation bar on every page.
// To add a new item to the menu, add an object here. To remove
// one, delete its object. To reorder, drag objects up or down.
// ============================================================

export const NAV = [
  { label: "Home", href: "/" },
  {
    label: "Product Reviews",
    href: "/reviews/",
    children: [
      { label: "Dogs", href: "/reviews/dogs/" },
      { label: "Cats", href: "/reviews/cats/" },
      { label: "Birds", href: "/reviews/birds/" },
      { label: "Reptiles", href: "/reviews/reptiles/" },
      { label: "Aquatics", href: "/reviews/aquatics/" },
      { label: "Small Animals", href: "/reviews/small-animals/" },
    ],
  },
  {
    label: "Guides",
    href: "/guides/",
    children: [
      { label: "Dogs", href: "/guides/dogs/" },
      { label: "Cats", href: "/guides/cats/" },
      { label: "Birds", href: "/guides/birds/" },
      { label: "Reptiles", href: "/guides/reptiles/" },
      { label: "Aquatics", href: "/guides/aquatics/" },
      { label: "Small Animals", href: "/guides/small-animals/" },
    ],
  },
  {
    label: "Shop by Pet",
    href: "/shop/",
    children: [
      { label: "Dogs", href: "/shop/dogs/" },
      { label: "Cats", href: "/shop/cats/" },
      { label: "Birds", href: "/shop/birds/" },
      { label: "Reptiles", href: "/shop/reptiles/" },
      { label: "Aquatics", href: "/shop/aquatics/" },
      { label: "Small Animals", href: "/shop/small-animals/" },
    ],
  },
  { label: "News", href: "/news/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

// ============================================================
// PET CATEGORIES — The six animal groups your site covers
// ============================================================
// This array is used to build category pages and navigation.
// If you ever want to add a 7th pet category (like "Horses"),
// you add it here AND create matching folders under
// src/content/reviews/ and src/content/guides/.
// ============================================================

export const PET_CATEGORIES = [
  {
    slug: "dogs",
    name: "Dogs",
    description:
      "Reviews and guides for dog parents — from puppy essentials to senior care, training tools to travel gear.",
    icon: "🐕",
    color: "#4a1a8a", // Purple from your logo (dog silhouette)
  },
  {
    slug: "cats",
    name: "Cats",
    description:
      "Everything for cat lovers — litter box technology, food dispensers, toys, scratchers, and care tips for all life stages.",
    icon: "🐈",
    color: "#e91e8a", // Pink from your logo (cat silhouette)
  },
  {
    slug: "birds",
    name: "Birds",
    description:
      "Gear and guidance for bird keepers — cages, perches, enrichment, nutrition, and species-specific care.",
    icon: "🦜",
    color: "#ef4444", // Red from your logo (bird silhouette)
  },
  {
    slug: "reptiles",
    name: "Reptiles",
    description:
      "Enclosures, lighting, heating, and husbandry for lizards, snakes, turtles, and other scaly companions.",
    icon: "🦎",
    color: "#6d28d9", // Purple from your logo (lizard silhouette)
  },
  {
    slug: "aquatics",
    name: "Aquatics",
    description:
      "Freshwater and saltwater aquarium equipment, fish care, and planted tank guides for new and experienced aquarists.",
    icon: "🐠",
    color: "#0e8c8c", // Teal from your logo (fish silhouette)
  },
  {
    slug: "small-animals",
    name: "Small Animals",
    description:
      "Habitats, enrichment, and care for guinea pigs, rabbits, hamsters, ferrets, hedgehogs, and other pocket pets.",
    icon: "🐹",
    color: "#f59e0b", // Warm amber accent
  },
];

// ============================================================
// AMAZON LINK BUILDER
// ============================================================
// This helper function takes a product's Amazon ASIN (the 10-character
// code like B0FFDNZSHT) and builds a fully formatted affiliate link
// in the exact format Amazon expects. Using this function instead of
// typing URLs by hand means you can never accidentally omit your tag.
//
// Usage in a Markdown file's frontmatter or in a component:
//   import { amazonLink } from '../consts';
//   const link = amazonLink('B0FFDNZSHT');
// ============================================================

export function amazonLink(asin) {
  return `https://www.amazon.com/dp/${asin}?th=1&linkCode=ll1&tag=${SITE.amazonTag}&language=en_US&ref_=as_li_ss_tl`;
}

// ============================================================
// DISCLOSURES — Legal text used in multiple places
// ============================================================
// These are the exact strings Amazon and the FTC require. Editing
// these without legal review is risky — they're written to meet
// current requirements verbatim.
// ============================================================

export const DISCLOSURE = {
  // Short version for the footer (every page)
  footerShort: "As an Amazon Associate I earn from qualifying purchases.",

  // Longer version for the top of affiliate articles (FTC requirement)
  inArticle:
    "This article contains affiliate links. As an Amazon Associate I earn from qualifying purchases. If you click through and buy, we may earn a small commission at no additional cost to you. All opinions are our own and we only recommend products we believe will genuinely help you and your pet.",

  // International availability note (appears on every product card)
  international:
    "This link also works for shoppers in Canada, France, Germany, Italy, the Netherlands, Poland, Spain, Sweden, and the United Kingdom — Amazon OneLink automatically redirects to your local marketplace.",

  // Price disclaimer (appears next to every price)
  priceNote: "*Price starts from and is subject to change",
};
