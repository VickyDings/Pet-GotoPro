// ============================================================
// SITE CONSTANTS — The Control Panel of Pet-GoToPro
// ============================================================
// This file holds settings used throughout the entire site.
// When you want to change something site-wide — a menu item,
// a tagline, your contact email — you come HERE and edit it
// in ONE place, and the change appears everywhere automatically.
// ============================================================

export const SITE = {
  name: "Pet-GoToPro",
  fullName: "Pet-Go'to'Pro",
  tagline: "Get trusted information from the Pet Pros",
  description:
    "Expert pet product reviews and care guides for dogs, cats, birds, reptiles, aquatics, and small animals. Trusted, tested, and always in your pet's best interest.",
  email: "contact@pet-gotopro.com",
  amazonTag: "bizco057-20",
  foundedYear: 2026,
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
// PET CATEGORIES — Redesigned with the seven-color palette
// ============================================================
// Colors now follow the Petco × Chewy hybrid design system.
// Each pet has a saturated color, a tint variant for backgrounds,
// and a text-safe dark variant for accessible text on white.
// ============================================================

export const PET_CATEGORIES = [
  {
    slug: "dogs",
    name: "Dogs",
    description:
      "Reviews and guides for dog parents — from puppy essentials to senior care, training tools to travel gear.",
    icon: "🐕",
    color: "#7B5BD9",       // Purple - saturated
    colorTint: "#ECE6FB",   // Light tint for backgrounds
    colorText: "#4E36A8",   // Dark variant for text on white
  },
  {
    slug: "cats",
    name: "Cats",
    description:
      "Everything for cat lovers — litter box technology, food dispensers, toys, scratchers, and care tips for all life stages.",
    icon: "🐈",
    color: "#E26AA1",       // Pink
    colorTint: "#FBE3EF",
    colorText: "#A93770",
  },
  {
    slug: "birds",
    name: "Birds",
    description:
      "Gear and guidance for bird keepers — cages, perches, enrichment, nutrition, and species-specific care.",
    icon: "🦜",
    color: "#EF6F5C",       // Coral
    colorTint: "#FCE2DC",
    colorText: "#B53A2B",
  },
  {
    slug: "reptiles",
    name: "Reptiles",
    description:
      "Enclosures, lighting, heating, and husbandry for lizards, snakes, turtles, arachnids, and other scaly companions.",
    icon: "🦎",
    color: "#7BA374",       // Sage green
    colorTint: "#E6EFE2",
    colorText: "#3F6E3A",
  },
  {
    slug: "aquatics",
    name: "Aquatics",
    description:
      "Freshwater and saltwater aquarium equipment, fish care, and planted tank guides for new and experienced aquarists.",
    icon: "🐠",
    color: "#2FA39B",       // Teal - now ONLY for aquatics, not site-wide
    colorTint: "#D8EFEC",
    colorText: "#0E6A66",
  },
  {
    slug: "small-animals",
    name: "Small Animals",
    description:
      "Habitats, enrichment, and care for guinea pigs, rabbits, hamsters, ferrets, hedgehogs, and other pocket pets.",
    icon: "🐹",
    color: "#E8B53D",       // Warm gold-yellow
    colorTint: "#FAEFC9",
    colorText: "#7E5A0C",
  },
];

// ============================================================
// AMAZON LINK BUILDER
// ============================================================

export function amazonLink(asin) {
  return `https://www.amazon.com/dp/${asin}?th=1&linkCode=ll1&tag=${SITE.amazonTag}&language=en_US&ref_=as_li_ss_tl`;
}

// ============================================================
// DISCLOSURES — Legal text used in multiple places
// ============================================================

export const DISCLOSURE = {
  footerShort: "As an Amazon Associate I earn from qualifying purchases.",
  inArticle:
    "This article contains affiliate links. As an Amazon Associate I earn from qualifying purchases. If you click through and buy, we may earn a small commission at no additional cost to you. All opinions are our own and we only recommend products we believe will genuinely help you and your pet.",
  international:
    "This link also works for shoppers in Canada, France, Germany, Italy, the Netherlands, Poland, Spain, Sweden, and the United Kingdom — Amazon OneLink automatically redirects to your local marketplace.",
  priceNote: "*Price starts from and is subject to change",
};
