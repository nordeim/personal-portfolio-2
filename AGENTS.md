# AGENTS.md: Nicholas Yun Portfolio (v2.0)

This document provides high-signal context for AI agents working in this repository to avoid common mistakes and architectural regressions.

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
- **Fix**: Use stable identifiers like `key={`para-${index}`}`.

### Bug 4: Light Theme Override Specificity Failures

- **Symptom**: Light theme styles don't apply.
- **Fix**: In CSS use `.theme-day .utility-class` selectors. In JSX className attributes use `[.theme-day_&]:` arbitrary variant syntax.

### Bug 5: `erasableSyntaxOnly` Rejecting Enums

- **Symptom**: TS build fails with "This syntax is not allowed when 'erasableSyntaxOnly' is enabled".
- **Fix**: Replace `enum` with union types (e.g., `type Icon = 'mail' | 'linkedin'`).

### Bug 6: `noUncheckedIndexedAccess` Errors

- **Symptom**: "Object is possibly 'undefined'" on array index access.
- **Fix**: Add explicit checks: `if (arr[index])` or use optional chaining `arr[index]?.prop`.

## Recommendations

- **Before making changes**: Run `pnpm typecheck`. It is fast and catches most issues.
- **When adding components**: Respect the `0px` border-radius (`rounded-none`) mandate.
- **When touching images**: Ensure `alt` text is meaningful. `alt=""` is only for decorative images (GrainOverlay, BrandMark).
- **When mapping arrays**: Verify `key` props are stable and unique.
- **When writing CSS**: No `tailwind.config.js` exists. All tokens go in `src/styles/index.css` under `@theme`.

Refer to [CLAUDE.md](./CLAUDE.md) for the "Meticulous Approach" workflow requirements.
