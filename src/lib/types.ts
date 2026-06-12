export interface HeroSlide {
  label: string;
  portraitKey: string;
  headline: string;
  subtitle: string;
  artifactTitle: string;
  artifactMeta: string;
  signature: string;
  accent: string;
  secondaryAccent: string;
  tags: string[];
}

export interface AboutPillar {
  title: string;
  paragraphs: string[];
}

export interface Project {
  title: string;
  category: string;
  accent: string;
  medium?: string;
  status: string;
  description: string;
  link?: string;
  linkLabel: string;
  slug: string;
  image?: string;
  body?: string;
}

export interface CollectionItem extends Project {
  collectionSlug: string;
  document?: string;
}

export interface Collection {
  slug: string;
  title: string;
  category: string;
  accent: string;
  description: string;
  status: string;
}

export interface ArchiveRoute {
  collectionSlug: string;
  itemSlug: string | null;
}

export interface SocialLink {
  label: string;
  icon: 'mail' | 'linkedin' | 'instagram' | 'github';
  href: string;
  description: string;
}

export interface MachineOverlayData {
  buildVersion: string;
  route: string;
  collections: Record<string, number>;
  activeData: unknown;
}
