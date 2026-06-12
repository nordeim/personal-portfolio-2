import type { Project, CollectionItem } from './types';

// ==========================================
// import.meta.glob — Content Ingestion
// CRITICAL: Paths are relative to THIS file (src/lib/), so they start with ../content/
// ==========================================

const portraitImages = import.meta.glob(
  ['../content/portrait/*.{jpg,jpeg,png,webp,avif}', '../content/portrait/**/*.{jpg,jpeg,png,webp,avif}'],
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>;

const portfolioImages = import.meta.glob(
  '../content/portfolio/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>;

const portfolioTextFiles = import.meta.glob(
  '../content/portfolio/**/*.{md,txt}',
  { eager: true, import: 'default', query: '?raw' },
) as Record<string, string>;

const collectionTextFiles = import.meta.glob(
  '../content/collections/**/*.{md,txt}',
  { eager: true, import: 'default', query: '?raw' },
) as Record<string, string>;

const collectionImages = import.meta.glob(
  '../content/collections/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>;

const collectionDocuments = import.meta.glob(
  '../content/collections/**/*.{pdf,docx}',
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>;

// ==========================================
// Utility Functions
// ==========================================

function extractBaseName(filePath: string): string {
  const fileName = filePath.split('/').pop() ?? '';
  return fileName.replace(/\.[^.]+$/, '');
}

function extractFolderName(filePath: string): string {
  const parts = filePath.split('/');
  return parts.length >= 2 ? (parts.at(-2) ?? '') : '';
}

function isCollectionGuideFile(filePath: string): boolean {
  const fileName = filePath.split('/').pop() ?? '';
  return fileName.startsWith('PUT_') && fileName.endsWith('_HERE.md');
}

interface FrontmatterResult {
  metadata: Record<string, string>;
  body: string;
}

function parseFrontmatter(raw: string): FrontmatterResult {
  const metadata: Record<string, string> = {};
  let body = raw;

  if (raw.startsWith('---')) {
    const endIndex = raw.indexOf('---', 3);
    if (endIndex !== -1) {
      const frontmatter = raw.slice(3, endIndex).trim();
      body = raw.slice(endIndex + 3).trim();
      for (const line of frontmatter.split('\n')) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.slice(0, colonIndex).trim();
          const value = line.slice(colonIndex + 1).trim();
          metadata[key] = value;
        }
      }
    }
  }

  return { metadata, body };
}

function findSiblingImage(
  basePath: string,
  imageMap: Record<string, string>,
): string | undefined {
  const baseName = extractBaseName(basePath);
  for (const [path, url] of Object.entries(imageMap)) {
    const imageBaseName = extractBaseName(path);
    if (imageBaseName === baseName) {
      return url;
    }
  }
  return undefined;
}

// ==========================================
// Public API
// ==========================================

export function getPortraitForKey(key: string): string {
  for (const [path, url] of Object.entries(portraitImages)) {
    const folder = extractFolderName(path);
    const base = extractBaseName(path);
    if (folder === key || base === key) {
      return url;
    }
  }
  return '/nicholas-portrait.jpg';
}

export function getPortfolioItems(): Project[] {
  const items: Project[] = [];

  for (const [path, raw] of Object.entries(portfolioTextFiles)) {
    if (isCollectionGuideFile(path)) continue;

    const { metadata, body } = parseFrontmatter(raw);
    const slug = extractBaseName(path);
    const image = findSiblingImage(path, portfolioImages);

    items.push({
      title: metadata['title'] ?? slug,
      category: metadata['category'] ?? 'code',
      accent: metadata['accent'] ?? '#2457ff',
      medium: metadata['medium'],
      status: metadata['status'] ?? 'active',
      description: metadata['description'] ?? '',
      link: metadata['link'],
      linkLabel: metadata['linkLabel'] ?? 'View Project',
      slug,
      image,
      body: body || undefined,
    });
  }

  return items;
}

export function getCollectionItems(collectionSlug: string): CollectionItem[] {
  const items: CollectionItem[] = [];

  for (const [path, raw] of Object.entries(collectionTextFiles)) {
    if (isCollectionGuideFile(path)) continue;

    const folder = extractFolderName(path);
    if (folder !== collectionSlug) continue;

    const { metadata, body } = parseFrontmatter(raw);
    const slug = extractBaseName(path);
    const image = findSiblingImage(path, collectionImages);

    // Find associated document
    let document: string | undefined;
    for (const [docPath, docUrl] of Object.entries(collectionDocuments)) {
      const docFolder = extractFolderName(docPath);
      const docBase = extractBaseName(docPath);
      if (docFolder === collectionSlug && docBase === slug) {
        document = docUrl;
        break;
      }
    }

    items.push({
      title: metadata['title'] ?? slug,
      category: metadata['category'] ?? collectionSlug,
      accent: metadata['accent'] ?? '#2457ff',
      medium: metadata['medium'],
      status: metadata['status'] ?? 'active',
      description: metadata['description'] ?? '',
      link: metadata['link'],
      linkLabel: metadata['linkLabel'] ?? 'View',
      slug,
      image,
      body: body || undefined,
      collectionSlug,
      document,
    });
  }

  return items;
}
