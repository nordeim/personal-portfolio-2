---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# Nicholas Yun Portfolio — The Engineered Soul (v2.0)

## Core Identity & Purpose

An avant-garde "Digital Installation" portfolio for Nicholas Yun. It balances **Tactile Brutalism** (visible grids, sharp borders, mono utility) with **High-End Editorial** (serif typography, extreme whitespace, cinematic motion) to deliver "Post-AI Authenticity."

**Tech Stack**: React 19 (Strict), TypeScript 6, Vite 6, Tailwind CSS 4.

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

Follow this workflow for all implementation tasks:

1. **ANALYZE** - Deep requirement mining; never assume surface-level needs.
2. **PLAN** - Create a structured roadmap; present for confirmation.
3. **VALIDATE** - Get explicit user approval before writing code.
4. **IMPLEMENT** - Build modular, tested, and documented components.
5. **VERIFY** - Rigorous QA (accessibility, performance, edge cases).
6. **DELIVER** - Complete handoff with knowledge transfer.

### Project-Specific Principles

- **Anti-Generic Mandate**: Every design decision must answer: *"Does this serve the tension between the mathematical and the emotional, or does it safely retreat to the middle?"* Reject purple gradients, safe font pairings, predictable card grids.
- **Bespoke Only**: No external UI libraries (no shadcn/ui, no Radix, no Framer Motion, no React Router). All components are purpose-built.
- **Data-Driven Architecture**: Content is ingested, not hardcoded. `import.meta.glob` is the content pipeline.
- **WCAG AAA Baseline**: Accessibility is not an afterthought — it is the starting point.

## Implementation Standards

### TypeScript & React

- **Strict Mode**: `strict: true` in `tsconfig.json`.
- **Typing**: Prefer `interface` for structural definitions; `type` for unions/intersections.
- **No `any`**: Use `unknown` or specific types.
- **No `enum` / `namespace`**: `erasableSyntaxOnly: true` is enabled. Use union types instead (e.g., `icon: 'mail' | 'linkedin' | 'github'`).
- **Indexed Access**: `noUncheckedIndexedAccess: true` — array/object index access returns `T | undefined`. Handle the `undefined` case explicitly.
Au692 - **Patterns**: Use early returns, composition over inheritance, and functional components.
- **States**: Handle loading, error, empty, and success states explicitly.
- **Key Props**: Use stable, unique keys in `.map()`. Avoid using array indices or raw strings. See `ContentBody.tsx` for a stable key pattern (`para-${index}`).

### Tailwind CSS v4 & Styling

- **CSS-First**: Configuration via `@theme` in `src/styles/index.css`. There is NO `tailwind.config.js`.
- **Grid Unit**: Use the 28px rhythm (`--unit: 28px`).
- **Brutalism**: `1px solid` borders, `0px` border-radius (`rounded-none`). Global `border-radius: 0px !important` is enforced.
- **No Rounding**: `rg "rounded-full\|rounded-md\|rounded-lg\|rounded-sm" src/` must return **zero** matches. Any new `rounded-*` class is a regression.
- **Custom Animations**: If you add a new animation (e.g., `@keyframes` + `.animate-foo`), define BOTH in `src/styles/index.css` and verify in the target component.
- **Fonts**:
  - Editorial: `Cormorant Garamond` (headlines, kinetic).
  - Utility: `IBM Plex Mono` (metadata, system labels).
  - Body: `Inter` (reading).
- **Light Theme Overrides**: In raw CSS use `.theme-day .utility-class` descendant selectors. In JSX className attributes use `[.theme-day_&]:` arbitrary variant syntax.
- **ClassName Concatenation**: ALWAYS use template literals. Never string concatenation.

## Development Workflow

### Build Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Vite development server |
| `pnpm build` | Compile TS and build production assets |
| `pnpm typecheck` | Run `tsc` strict type checking (mandatory before pushing) |
| `pnpm preview` | Preview production build locally |

### File Organization

- `/src/components`: UI primitives and composite installations.
- `/src/hooks`: Motion logic (`useWeightedScroll`) and system state (`useRouteHash`, `useReducedMotion`).
- `/src/lib`: Data structures (`data.ts`), types (`types.ts`), and ingestion (`content.ts`).
- `/src/styles`: Tailwind configuration and global styles.
- `/src/content`: File-system content (portrait images, portfolio markdown, collections).

## Testing Strategy

- Run `pnpm typecheck` after every change — this is the primary quality gate.
- Verify `pnpm build` passes with zero errors and zero warnings after styling changes.
- Visual QA: verify 28px grid alignment, brutalist borders, and theme switching after component changes.
- Accessibility QA: verify reduced motion behavior, alt text, and keyboard navigation.

## Code Quality Standards

- **TypeScript strict mode** catches most issues at compile time.
- **No `any`** — if you can't type it, use `unknown`.
- **No dead code** — `noUnusedLocals` and `noUnusedParameters` are enabled.
- **Verify** `rg "rounded-full\|rounded-md\|rounded-lg\|rounded-sm" src/` returns empty before committing.

## Project-Specific Standards

### Kinetic Typography

Headlines in `HeroKinetic` fluctuate in font-weight based on scroll velocity (calculated in `useWeightedScroll`). Ensure all motion respects `prefers-reduced-motion` — the hook returns static `950` when reduced motion is preferred.

### Routing

Uses custom hash-based routing via `useRouteHash.ts`. Avoid adding standard router libraries unless explicitly requested. Route format: `#collection/{slug}` or `#collection/{slug}/{item}`.

### Data Management

Content is data-driven. Define new entities in `src/lib/types.ts` and populate them in `src/lib/data.ts`. Imagery is ingested via `import.meta.glob` in `src/lib/content.ts`.

- **CRITICAL**: Glob paths are relative to `src/lib/content.ts`, so they MUST start with `../content/`. Using `./content/` is a fatal error.
- **Guide Files**: `PUT_*_HERE.md` files are excluded from production data by `isCollectionGuideFile()`.
- **Eager Loading**: `eager: true` is correct for this portfolio (~20 files). For >500 items, switch to `{ eager: false }`.
- **Collections**: `collectionDefinitions[]` (in `data.ts`) must have a `slug` that **exactly** matches the directory name under `src/content/collections/`. Mismatch = empty collection.

### Accessibility (WCAG AAA)

- All content images must have meaningful `alt` text. Do not use empty `alt=""` for content images.
- All animations must check `useReducedMotion()`.
- The `prefers-reduced-motion` media query in `src/styles/index.css` disables transitions globally.
- Skip-to-content link present in `App.tsx`.
- Focus visible: `outline: 3px solid rgba(36, 87, 255, 0.35); outline-offset: 3px`.

### Thin Orchestrator Pattern

`App.tsx` is the single source of truth for all application state. No context providers. Max prop drilling depth is 2 (App → Navigation → ThemeToggle). State owned: `activeHeroIndex`, `isNightMode`, `isMenuOpen`, `isMachineOpen`, `routeHash`.

## Anti-Patterns to Avoid

- **AI Slop**: Purple gradients, generic card grids, "safe" system fonts without hierarchy.
- **Monoliths**: Keep components small and focused.
- **Over-Engineering**: Do not add libraries (like Framer Motion) for effects achievable with simple CSS/hooks.
- **Inconsistent Radii**: Do not mix `rounded-none` with other border radius classes. The design system is intentionally brutalist.
- **External UI Libraries**: No shadcn/ui, Radix, MUI, or component libraries. All components are bespoke.
- **Orphaned CSS**: Do not add `@keyframes` without a corresponding utility class, or vice versa. Both must exist in `index.css`.
