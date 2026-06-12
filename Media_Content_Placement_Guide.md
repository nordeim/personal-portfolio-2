# Media Content Placement Guide

This guide documents where and how to place image and PDF files so the site ingests them automatically through `import.meta.glob`.

## Supported File Types

| Type | Extensions |
|------|------------|
| Images | `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` |
| Text | `.md`, `.txt` |
| Documents | `.pdf` |

## Directory Tree

All content lives under **`src/content/`**:

```
src/content/
├── portrait/                    # Hero portrait images for landing page slides
│   ├── creative-technologist/
│   ├── nicholas-yun/
│   ├── open-to-collaborate/
│   └── project-archive/
├── collections/                 # Archive items (appear at #/collections/<slug>)
│   ├── artworks/
│   ├── design/
│   ├── photography/
│   ├── poetry/
│   ├── stories/
│   └── web-experiments/
└── portfolio/                   # Legacy portfolio items (as-is)
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

**Behavior**: The `getPortraitForKey()` function in `HeroKinetic.tsx` matches the slide's `portraitKey` to a folder inside `portrait/`. The first image found in the folder is used.

**Current Mappings** (in `src/lib/data.ts`):n
| Slide | `portraitKey` | Target Folder |
|-------|---------------|----------------|
| 1. Creative Technologist | `creative-technologist` | `src/content/portrait/creative-technologist/` |
| 1. (Active portrait) | `nicholas-yun` | `src/content/portrait/nicholas-yun/` |
| 2. Growing Collections | `project-archive` | `src/content/portrait/project-archive/` |
| 3. Open To Collaborate | `open-to-collaborate` | `src/content/portrait/open-to-collaborate/` |

**Rules**:
- Place exactly **one image** inside the matching folder.
- Filename can be anything (e.g., `portrait.webp`, `profile.jpg`).
- If no image is found, the code falls back to `/nicholas-portrait.jpg` (which currently does not exist), showing the "NY" placeholder instead.

**Example**:
```bash
# Place main profile image for the "nicholas-yun" slide
mv nicholas-0.webp src/content/portrait/nicholas-yun/
```

---

## 2. Collection Items (Archive Pages)

**Purpose**: Populate the archive spreads accessible via hash URLs (e.g., `#/collections/poetry`).

**Path**: `src/content/collections/<collection-slug>/`

**Valid Slugs** (matching `collectionDefinitions` in `src/lib/data.ts`):n| Slug | Category | Accent |
|------|----------|--------|
| `artworks` | Art | `#00a77f` |
| `design` | Design | `#ff5c35` |
| `photography` | Photography | `#f2b705` |
| `poetry` | Poetry | `#8f55ff` |
| `stories` | Storytelling | `#e5488b` |
| `web-experiments` | Creative Tech | `#2457ff` |

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
Place a `.pdf` file. It will be linked as a "Download" or "Open" action.

```bash
cp manifesto.pdf src/content/collections/design/
```

### Frontmatter (Optional)
You can add YAML frontmatter at the top of `.md` files:

```markdown
---
title: Custom Title
accent: '#ff0000'
medium: Watercolor
description: Optional description for previews
---

Body text goes here...
```

---

## 3. Portfolio Gateway Items (Legacy)

**Purpose**: Feed the BentoGrid on the landing page.

**Path**: `src/content/portfolio/<category>/`

**Categories**: `art`, `code`, `design`, `experiments`, `photography`, `poetry`, `storytelling`

**Behavior**: Similar to collections, but these appear in the main portfolio grid.

**Example**:
```bash
cp birthday-card.jpg src/content/portfolio/design/
cp birthday-card.md src/content/portfolio/design/
```

---

## Quick Reference Cheat Sheet

| Content Type | Destination Path | File Type | Result |
|-------------|-------------------|-----------|--------|
| Main hero portrait | `portrait/nicholas-yun/` | `.jpg`, `.png`, `.webp` | Hero slide portrait |
| Project hero photo | `portrait/project-archive/` | `.jpg`, `.png`, `.webp` | Hero slide portrait |
| Poem with image | `collections/poetry/` | `.md` + matching `.jpg/.webp` | Archive item + preview |
| Image only | `collections/photography/` | `.jpg`, `.png`, `.webp` | Archive item (image-led) |
| PDF document | `collections/stories/` | `.pdf` | Downloadable item |
| Portfolio project | `portfolio/design/` | `.md` + `.jpg`/`.webp` | Bento grid tile |

---

## File Naming Conventions

- **No spaces**: Use `kebab-case` or `snake_case` (e.g., `morning-poem.md`, not `morning poem.md`).
- **Match filenames**: For paired image + text, keep the basenames identical: `item-name.md` + `item-name.webp`.
- **Ignore helpers**: Files starting with `README.md`, `PUT_...`, or `.md` starting with a dot are ignored by the ingestor.

## Build Verification

After placing new files, always verify:

```bash
# Check that assets are found by the build
pnpm build

# Look for your files in the output list
# Example:
# dist/assets/nicholas-0--W2dqedH.webp    329.89 kB
# dist/assets/maudie-house-on-fire-C7gYPHYQ.pdf   1,901.35 kB
```

If a file is not bundled into the build, check:
1. **Extension**: Is it `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.md`, `.txt`, or `.pdf`?
2. **Location**: Is it inside `src/content/` (not at the project root or in `public/`)?
3. **Path**: Did you skip a folder level? Remember: `src/content/collections/poetry/`, not `src/collections/poetry/`.

---

## Troubleshooting

### "Image shows 'NY' placeholder instead of photo"
- Check that the file is inside the correct `portrait/<portraitKey>/` folder.
- Ensure the `portraitKey` in `src/lib/data.ts` matches the folder name exactly.
- Remember: `src/content/` (plural) is correct, not `src/content/`.

### "Collection item has no preview image"
- Place an image file with the **same base filename** as the text file inside the same folder.
- Example: `poem.md` + `poem.jpg` (not `poem.md` + `photo-of-poem.jpg`).

### "File not appearing after build"
- The `import.meta.glob` scans at build time. Restart the dev server or rebuild if you added files while `pnpm dev` was already running.
- Check for typos in the file extension or folder path.
