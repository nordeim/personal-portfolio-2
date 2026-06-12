import type { HeroSlide, AboutPillar, Project, Collection, SocialLink } from './types';

// ==========================================
// Hero Slides
// ==========================================

export const heroSlides: HeroSlide[] = [
  {
    label: 'Creative Technologist',
    portraitKey: 'nicholas-yun',
    headline: 'Ideas, made tangible.',
    subtitle: 'Code. Design. Words. Images. Experiments.',
    artifactTitle: 'Idea \u2192 Interface \u2192 Feeling',
    artifactMeta: 'Code / Design / Words',
    signature: 'NY',
    accent: '#2457ff',
    secondaryAccent: '#00a77f',
    tags: ['Code', 'Design', 'Words', 'Images', 'Experiments'],
  },
  {
    label: 'Design Engineer',
    portraitKey: 'nicholas-yun',
    headline: 'Precision meets poetry.',
    subtitle: 'Where brutalist structure meets editorial elegance.',
    artifactTitle: 'Structure \u2192 Story \u2192 Soul',
    artifactMeta: 'Architecture / Narrative / Emotion',
    signature: 'NY',
    accent: '#ff5c35',
    secondaryAccent: '#f2b705',
    tags: ['Architecture', 'Narrative', 'Emotion'],
  },
  {
    label: 'Digital Craftsman',
    portraitKey: 'nicholas-yun',
    headline: 'Engineered soul.',
    subtitle: 'Every pixel intentional. Every interaction human.',
    artifactTitle: 'Craft \u2192 Code \u2192 Character',
    artifactMeta: 'Detail / Logic / Identity',
    signature: 'NY',
    accent: '#8f55ff',
    secondaryAccent: '#e5488b',
    tags: ['Detail', 'Logic', 'Identity'],
  },
];

// ==========================================
// About Pillars
// ==========================================

export const aboutPillars: AboutPillar[] = [
  {
    title: 'The Engineer',
    paragraphs: [
      'I build systems that think. From distributed architectures to pixel-perfect interfaces, every line of code serves a purpose. The machine is not the enemy of beauty \u2014 it is its most precise instrument.',
      'My engineering philosophy is rooted in mathematical rigor: 28px grids, strict typing, composability over inheritance. The best code is the code that disappears into the experience it creates.',
      'Fifteen years of crafting production systems have taught me that reliability and elegance are not opposing forces \u2014 they are the same force, expressed at different scales.',
    ],
  },
  {
    title: 'The Designer',
    paragraphs: [
      'I reject the generic. In an age of AI-generated sameness, I design interfaces that remember. Tactile brutalism meets high-end editorial \u2014 structure that breathes, whitespace that speaks.',
      'Every design decision answers to a dual thesis: does this serve the tension between the mathematical and the emotional? If it safely retreats to the middle, it has failed.',
      'My design system is built on intentionality: Cormorant Garamond for the soul, IBM Plex Mono for the machine, Inter for the everyday. Three voices, one conversation.',
    ],
  },
  {
    title: 'The Storyteller',
    paragraphs: [
      'Words are interfaces. A poem is a user experience compressed to its purest form \u2014 every syllable intentional, every line break a design decision. I write code that tells stories and stories that function like code.',
      'My archives are living collections \u2014 not portfolios of finished products, but editorial spreads that document process, struggle, and evolution. The work is never done; it simply arrives at resting points.',
      'From technical documentation to creative essays, I believe the best writing emerges at the intersection of clarity and beauty. Information architecture is narrative architecture.',
    ],
  },
];

// ==========================================
// Projects (Bento Grid)
// ==========================================

export const projects: Project[] = [
  {
    title: 'System Architecture',
    category: 'code',
    accent: '#2457ff',
    status: 'active',
    description: 'Distributed systems designed for resilience. Microservices, event-driven patterns, and cloud-native infrastructure.',
    linkLabel: 'View Project',
    slug: 'system-architecture',
  },
  {
    title: 'Visual Identity',
    category: 'design',
    accent: '#ff5c35',
    status: 'active',
    description: 'Brand systems built on mathematical foundations. Typography, color theory, and spatial logic converge into identity.',
    linkLabel: 'View Project',
    slug: 'visual-identity',
  },
  {
    title: 'Verse & Prose',
    category: 'poetry',
    accent: '#8f55ff',
    status: 'active',
    description: 'Poetry as interface design. Every word a pixel, every stanza a layout. The page is the screen.',
    linkLabel: 'Read Collection',
    slug: 'verse-prose',
  },
  {
    title: 'Captured Light',
    category: 'photography',
    accent: '#f2b705',
    status: 'active',
    description: 'Street photography, architectural geometry, and the pursuit of decisive moments in everyday chaos.',
    linkLabel: 'View Gallery',
    slug: 'captured-light',
  },
  {
    title: 'Generative Art',
    category: 'art',
    accent: '#00a77f',
    status: 'active',
    description: 'Algorithm-driven visual experiments. Code as canvas, mathematics as medium, randomness as collaborator.',
    linkLabel: 'Explore',
    slug: 'generative-art',
  },
  {
    title: 'Narrative Work',
    category: 'story',
    accent: '#e5488b',
    status: 'active',
    description: 'Long-form essays and narrative experiments. Stories that stretch across media and resist easy categorization.',
    linkLabel: 'Read More',
    slug: 'narrative-work',
  },
];

// ==========================================
// Collection Definitions
// ==========================================

export const collectionDefinitions: Collection[] = [
  {
    slug: 'poetry',
    title: 'Verse & Prose',
    category: 'poetry',
    accent: '#8f55ff',
    description: 'Poetry as interface design. Every word a pixel, every stanza a layout.',
    status: 'active',
  },
  {
    slug: 'photography',
    title: 'Captured Light',
    category: 'photography',
    accent: '#f2b705',
    description: 'Street photography and architectural geometry.',
    status: 'active',
  },
  {
    slug: 'experiments',
    title: 'Lab Experiments',
    category: 'experiments',
    accent: '#16a3b8',
    description: 'Technical experiments and creative explorations.',
    status: 'active',
  },
];

// ==========================================
// Social Links
// ==========================================

export const socialLinks: SocialLink[] = [
  {
    label: 'Email',
    icon: 'mail',
    href: 'mailto:hello@nicholasyun.com',
    description: 'Get in touch',
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://linkedin.com/in/nicholasyun',
    description: 'Professional network',
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    href: 'https://instagram.com/nicholasyun',
    description: 'Visual journal',
  },
  {
    label: 'GitHub',
    icon: 'github',
    href: 'https://github.com/nicholasyun',
    description: 'Open source work',
  },
];
