# Media Content Placement Guide

This guide documents where and how to place image and PDF files so the site ingests them automatically through `import.meta.glob`.

## Supported File Types

| Type | Extensions |
|------|------------|
| Images | `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` |
| Text | `.md`, `.txt` |
| Documents | `.pdf`, `.docx` |

## Directory Tree

All content lives under **`src/content/`**:

```
src/content/
├── portrait/                    # Hero portrait images for landing page slides
│   ├── creative-technologist/
│   ├── nicholas-yun/
│   ├── open-to-collaborate/
│   └── project-archive/
├── collections/                 # Archive items (appear at #collection/<slug>)
│   ├── artworks/
│   ├── design/
│   ├── photography/
│   ├── poetry/
│   ├── stories/
│   └── web-experiments/
└── portfolio/                   # Portfolio items (ingested into Bento Grid)
    ├── art/
    ├── code/
    ├── design/
    ├── experiments/
    ├── photography/
    ├── poetry/
    └── storytelling/
```

---

## 1. Portrait Images (Landing Page Hero Slides)

**Purpose**: Power the rotating hero portrait on the landing page.

**Path**: `src/content/portrait/<portraitKey>/`

**Behavior**: The `getPortraitForKey()` function in `src/lib/content.ts` matches the slide's `portraitKey` to a folder inside `portrait/`. The first image found in the folder is used.

**Current Mappings** (in `src/lib/data.ts`):
All current slides use `portraitKey: 'nicholas-yun'`. However, you can update slides to use other folders:

| Folder Name | Intended Use |
|-------------|--------------|
| `nicholas-yun` | Default profile portrait |
| `creative-technologist` | Work-in-progress / tech-focused portrait |
| `project-archive` | Archive-focused imagery |
| `open-to-collaborate` | Contact/Collaborate-focused portrait |

**Rules**:
- Place exactly **one image** inside the matching folder.
- Filename can be anything (e.g., `portrait.webp`, `profile.jpg`).
- If no image is found, the code falls back to `/nicholas-portrait.jpg` (in `public/`).

**Example**:
```bash
# Place main profile image for the "nicholas-yun" slide
cp profile.webp src/content/portrait/nicholas-yun/nicholas-0.webp
```

---

## 2. Collection Items (Archive Pages)

**Purpose**: Populate the archive spreads accessible via hash URLs (e.g., `#collection/poetry`).

**Path**: `src/content/collections/<collection-slug>/`

**Active Slugs** (defined in `src/lib/data.ts`):
Only slugs defined in `collectionDefinitions` will render an archive page.

| Slug | Category | Directory Name |
|------|----------|----------------|
| `poetry` | Poetry | `poetry` |
| `photography` | Photography | `photography` |
| `experiments` | Creative Tech | `web-experiments` |

*Note: There is currently a mismatch between the slug `experiments` and the directory `web-experiments`. To ensure items show up, the folder name must match the slug exactly.*

### 2.1 Image-Only Items
Place an image directly in the folder. It will appear as a collection item with its filename as the title.

```bash
cp mountain-sunset.jpg src/content/collections/photography/
```

### 2.2 Text Items (with optional paired image)
Place a `.md` or `.txt` file. Add a **same-filename** image next to it to use it as that item's preview.

```bash
# Example: A poem with an accompanying image
cp morning-poem.md src/content/collections/poetry/
cp morning-poem.jpg src/content/collections/poetry/  # Same basename; becomes preview image
```

### 2.3 Document Items
Place a `.pdf` or `.docx` file. It will be linked via the `document` property in the item data.

```bash
cp manifesto.pdf src/content/collections/stories/
```

### Frontmatter (Supported)
You can add YAML-like frontmatter at the top of `.md` files:

```markdown
---
title: Custom Title
accent: '#ff0000'
medium: Watercolor
description: Optional description for previews
status: completed
link: https://example.com
---

Body text goes here...
```

---

## 3. Portfolio Items (Bento Grid)

**Purpose**: Feed the BentoGrid on the landing page.

**Path**: `src/content/portfolio/<category>/`

**Categories**: `art`, `code`, `design`, `experiments`, `photography`, `poetry`, `storytelling`

**Behavior**: These items are ingested into the `BentoGrid` via `getPortfolioItems()`.

**Example**:
```bash
cp birthday-card.jpg src/content/portfolio/design/
cp birthday-card.md src/content/portfolio/design/
```

---

## Quick Reference Cheat Sheet

| Content Type | Destination Path | File Type | Result |
|-------------|-------------------|-----------|--------|
| Main hero portrait | `portrait/nicholas-yun/` | `.jpg`, `.png`, `.webp`, `.avif` | Hero slide portrait |
| Poem with image | `collections/poetry/` | `.md` + matching image | Archive item + preview |
| Image only | `collections/photography/` | `.jpg`, `.png`, `.webp`, `.avif` | Archive item (image-led) |
| PDF/Docx document | `collections/stories/` | `.pdf`, `.docx` | Downloadable item |
| Portfolio project | `portfolio/code/` | `.md` + image | Bento grid tile |

---

## File Naming Conventions

- **No spaces**: Use `kebab-case` or `snake_case` (e.g., `morning-poem.md`, not `morning poem.md`).
- **Match filenames**: For paired image + text, keep the basenames identical: `item-name.md` + `item-name.webp`.
- **Ignore helpers**: Files starting with `README.md`, `PUT_...`, or `.md` starting with a dot are ignored by the ingestor.

## Build Verification

After placing new files, always verify:

```bash
# 1. Typecheck (Mandatory)
pnpm typecheck

# 2. Production Build
pnpm build
```

If a file is not appearing, check:
1. **Extension**: Is it one of the supported types?
2. **Folder Name**: Does it match the slug/category exactly?
3. **Eager Loading**: The app uses eager loading for content. Ensure you rebuild after adding files.

---

## Troubleshooting

### "Image shows 'NY' placeholder instead of photo"
- Check that the file is inside the correct `portrait/<portraitKey>/` folder.
- Ensure the `portraitKey` in `src/lib/data.ts` matches the folder name exactly.

### "Collection item has no preview image"
- Place an image file with the **same base filename** as the text file inside the same folder.
- Example: `poem.md` + `poem.jpg` (not `poem.md` + `photo-of-poem.jpg`).

### "File not appearing after build"
- The `import.meta.glob` scans at build time. Restart the dev server or rebuild if you added files while `pnpm dev` was already running.
- Check for typos in the file extension or folder path.
