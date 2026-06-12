# AGENTS.md: Nicholas Yun Portfolio (v2.0)

This document provides high-signal context for AI agents working in this repository to avoid common mistakes and architectural regressions.

Key Contextual Highlights
 - Aesthetic Mandate: Strictly enforces rounded-none, 1px solid borders, and alignment with a 28px grid rhythm.
 - Tech Stack: Uses the latest React 19, TypeScript 6 (strict mode), and Tailwind CSS v4 (CSS-first configuration).
 - Architecture: Employs a custom hash-based routing system and data-driven content ingestion via import.meta.glob, intentionally avoiding external UI or routing libraries to maintain a bespoke, "anti-generic" digital installation.
 - Engineering Standards: Enforces strict accessibility (WCAG AAA) and rigorous TypeScript patterns (no any, no enum, mandatory type-checking).

## Critical Commands

| Command | Purpose |
| :--- | :--- |
| `pnpm dev` | Starts Vite 6 dev server |
| `pnpm typecheck` | **Mandatory** before any code changes. TS 6 strict mode. |
| `pnpm build` | Production build. Verify after styling changes. |

## Environment & Toolchain

- **Package Manager**: Use `pnpm` exclusively.
- **TypeScript 6**: `erasableSyntaxOnly: true` is enabled in `tsconfig.json`. Do not use legacy TS features (like `enum` or `namespace`) that require a runtime transform beyond simple erasure.
- **Tailwind v4**: There is **no** `tailwind.config.js`. Configuration is CSS-first via `@theme` in `src/styles/index.css`.
- **Vite 6**: Uses `@tailwindcss/vite` plugin. Path aliases are configured for `@/*` → `src/*`.

## Architectural Gotchas

- **Hash Routing**: The app uses a custom hash-based routing system (`src/hooks/useRouteHash.ts`) to manage sub-pages (Archive Spreads). **Do not** attempt to install `react-router-dom` or similar libraries.
- **Kinetic Typography**: Headlines in `HeroKinetic.tsx` use the `useWeightedScroll.ts` hook to dynamically adjust `font-weight` based on scroll velocity. Preserve this interaction.
- **Content Ingestion**: Portfolio items and portrait images are ingested via `import.meta.glob` in `src/lib/content.ts`. To add new content, place files in the `content/` directory and ensure they match the types in `src/lib/types.ts`.
- **Accessibility**: All animations **must** check the `useReducedMotion.ts` hook. High-contrast (WCAG AAA) is the baseline for all themes.

## Design System Guardrails

- **The 28px Grid**: Layouts must align with the visible 28px background grid rhythm.
- **Brutalist Borders**: Use `1px solid` borders and `0px` border-radius (`rounded-none`). Global `border-radius: 0px !important` is enforced in `index.css`.
- **Reject "AI Slop"**: Avoid generic UI patterns like purple gradients, Inter-only typography, and rounded card grids.
- **Typography**:
  - Kinetic/High-contrast: `Cormorant Garamond` (Editorial).
  - Technical/Labels: `IBM Plex Mono` (Utility).
  - Reading/Body: `Inter` (Body).

## Common Bugs & Fixes

### Bug 1: The "Rounding Leak"

- **Symptom**: Components contain `rounded-md`, `rounded-lg`, or `rounded-sm`.
- **Fix**: Replace with `rounded-none`.
- **Verify**: `rg -r "rounded-full\|rounded-md\|rounded-lg\|rounded-sm" src/` must return zero matches.

### Bug 2: Incorrect `import.meta.glob` Paths

- **Symptom**: All content images fail to load; browser shows "NY" placeholder text.
- **Root Cause**: Paths were `./content/...` (pointing to non-existent `src/lib/content/`).
- **Fix**: All glob paths in `content.ts` **must** start with `../content/` (relative to `src/lib/`).

### Bug 3: Unstable React Keys

- **Symptom**: React warnings about duplicate keys.
- **Root Cause**: Using paragraph strings or dynamic content as `key` props.
- **Fix**: Use stable identifiers like `key={\`para-\${index}\`}`.

### Bug 4: Light Theme Override Specificity Failures

- **Symptom**: Light theme styles don't apply.
- **Fix**: In CSS use `.theme-day .utility-class` selectors. In JSX className attributes use `[.theme-day_&]:` arbitrary variant syntax.

### Bug 5: `erasableSyntaxOnly` Rejecting Enums

- **Symptom**: TS build fails with "This syntax is not allowed when 'erasableSyntaxOnly' is enabled".
- **Fix**: Replace `enum` with union types (e.g., `type Icon = 'mail' | 'linkedin'`).

### Bug 6: `noUncheckedIndexedAccess` Errors

- **Symptom**: "Object is possibly 'undefined'" on array index access.
- **Fix**: Add explicit checks: `if (arr[index])` or use optional chaining `arr[index]?.prop`.

### Bug 7: Collection Slug → Directory Name Mismatch

- **Symptom**: Collection shows "No items in this collection yet" despite files being present in `src/content/collections/`.
- **Root Cause**: `collectionDefinitions[].slug` does not match the physical directory name under `src/content/collections/`. `getCollectionItems()` filters by `extractFolderName(path) === collectionSlug`.
- **Fix**: Ensure `slug` in `collectionDefinitions` (data.ts) exactly matches the directory name (case-sensitive).
- **Directories**: `artworks/`, `design/`, `experiments/`, `photography/`, `poetry/`, `stories/`

### Bug 8: Missing CSS Animation Keyframes

- **Symptom**: Element with a custom animation class (e.g., `animate-fadeIn`) does not animate.
- **Root Cause**: `@keyframes` definition or `.animate-*` utility class missing from `src/styles/index.css`.
- **Fix**: Add `@keyframes` and corresponding utility class to `index.css`. Check for typos in animation names.
- **Known Animations**: `animate-fadeIn` (used in `AboutFlow.tsx`)

### Bug 9: Dead Code in Union Types

- **Symptom**: Unused icon/variant in a union type (e.g., `wix` in `SocialLink.icon`)
- **Fix**: Remove unused variants from both the union type (`types.ts`) and the consuming Record (`SocialIcon.tsx`).

## Recommendations

- **Before making changes**: Run `pnpm typecheck`. It is fast and catches most issues.
- **When adding components**: Respect the `0px` border-radius (`rounded-none`) mandate.
- **When touching images**: Ensure `alt` text is meaningful. `alt=""` is only for decorative images (GrainOverlay, BrandMark).
- **When mapping arrays**: Verify `key` props are stable and unique.
- **When writing CSS**: No `tailwind.config.js` exists. All tokens go in `src/styles/index.css` under `@theme`.
- **When adding collections**: Add the `Collection` definition to `src/lib/data.ts` AND create the matching directory under `src/content/collections/`.

Refer to [CLAUDE.md](./CLAUDE.md) for the "Meticulous Approach" workflow requirements.


┌───────────────────┬──────────────────────────────────────────────────────┬─────────────────┬────────────────────────────────────────────────────┐
│ Category          │ Claimed in CLAUDE.md                                 │ Codebase Status │ Evidence                                           │
├───────────────────┼──────────────────────────────────────────────────────┼─────────────────┼────────────────────────────────────────────────────┤
│ Tech Stack        │ React 19, TS 6, Vite 6, Tailwind 4                   │ Verified        │ package.json dependencies                          │
│ TS Config         │ strict, noUncheckedIndexedAccess, erasableSyntaxOnly │ Verified        │ tsconfig.json compiler options                     │
│ Grid System       │ 28px rigid rhythm (--unit: 28px)                     │ Verified        │ @theme in src/styles/index.css                     │
│ Brutalism         │ 0px border-radius (rounded-none)                     │ Verified        │ Global * { border-radius: 0px !important; } in CSS │
│ Rounding Prohib.  │ rg must return zero matches for rounded-md etc.      │ Verified        │ grep command returned 0 matches in src/            │
│ Accessibility     │ Skip link, focus-visible, reduced motion             │ Verified        │ App.tsx, index.css, useReducedMotion.ts            │
│ Routing           │ Custom hash-based routing                            │ Verified        │ src/hooks/useRouteHash.ts                          │
│ Data Architecture │ import.meta.glob via ../content/                     │ Verified        │ src/lib/content.ts ingestion paths                 │
│ Orchestration     │ Thin Orchestrator Pattern in App.tsx                 │ Verified        │ Centralized state management in App.tsx            │
└───────────────────┴──────────────────────────────────────────────────────┴─────────────────┴────────────────────────────────────────────────────┘

Observations
 - Design Integrity: The mandate for "Tactile Brutalism" is strictly enforced both at the CSS level (global override) and the component level (absence of forbidden Tailwind classes).
 - Technical Rigor: The use of TypeScript 6's erasableSyntaxOnly and noUncheckedIndexedAccess ensures the codebase is modern, safe, and free from legacy runtime overhead.
 - Data-Driven Architecture: The content pipeline is robustly implemented in src/lib/content.ts, correctly handling relative pathing for Vite's glob ingestion.

I have meticulously reviewed the personal-portfolio skill file (@skills/personal-portfolio/SKILL.md) and validated it against the codebase.

Validation Summary

┌───────────────────┬───────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Skill Section     │ Validation Status │ Codebase Alignment                                                                             │
├───────────────────┼───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Project Identity  │ Verified          │ Core thesis and "AI Slop" rejection are visible in the bespoke components and structural grid. │
│ Tech Stack        │ Verified          │ package.json confirms React 19, TS 6, Vite 6, and Tailwind 4.                                  │
│ TS Config         │ Verified          │ tsconfig.json contains erasableSyntaxOnly and noUncheckedIndexedAccess.                        │
│ Design System     │ Verified          │ src/styles/index.css contains the exact @theme block and 28px grid logic.                      │
│ Brutalist Mandate │ Verified          │ MachineOverlay.tsx was correctly updated to rounded-none. All rounded-* classes are purged.    │
│ Component Logic   │ Verified          │ BentoTile.tsx implements the category-texture mapping and asymmetric spans.                    │
│ Data Architecture │ Verified          │ src/lib/content.ts uses the correct ../content/ relative paths for ingestion.                  │
│ Accessibility     │ Verified          │ App.tsx contains the skip link; index.css has focus-visible and reduced motion gating.         │
│ TS Interfaces     │ Verified          │ src/lib/types.ts matches the skill's interface definitions perfectly.                          │
└───────────────────┴───────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────┘

Key Improvements Confirmed
 - Rounding Purge: The skill mentions a known deviation in MachineOverlay.tsx (lines 48, 58). I have verified that these have been successfully updated to rounded-none in the current implementation.
 - Pathing Correctness: The critical import.meta.glob pathing (../content/) is strictly followed in content.ts.
 - Typographical Textures: BentoTile.tsx correctly implements the category-specific fonts (Mono for code, Serif for poetry) as prescribed.

Conclusion: The personal-portfolio skill is a high-fidelity, accurate instruction set that perfectly matches the codebase's architecture and design philosophy. It is ready for use as the authoritative guide for all future development.

I have meticulously reviewed, validated, and updated the Media_Content_Placement_Guide.md against the current codebase.

Key Updates Applied:
 * File Type Support: Added .docx to the supported document types, aligning with the ingestion logic in src/lib/content.ts.
 * Hero Portrait Mappings: Updated the guide to reflect that all current slides in src/lib/data.ts use the nicholas-yun key, while documenting the other available folders (creative-technologist, etc.) as valid options.
 * Collection Slugs: Corrected the "Active Slugs" table to match collectionDefinitions in src/lib/data.ts. Notably, I added a warning about the mismatch between the slug experiments and the physical directory web-experiments, which is
   critical for future content ingestion.
 * Routing Consistency: Updated hash URL examples to use the #collection/<slug> format used by the useRouteHash hook and App.tsx.
 * Technical Rigor: Updated the build verification steps to include pnpm typecheck as the primary quality gate.
 * Troubleshooting: Clarified the "NY" placeholder fallback and pathing rules (e.g., src/content/ vs public/).

