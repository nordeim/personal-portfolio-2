# Nicholas Yun Portfolio (v2.0) — The Engineered Soul

This project is an avant-garde **Digital Installation** that balances **Tactile Brutalism** with **High-End Editorial** aesthetics. It is a statement against generic web design, emphasizing structural transparency, mathematical rigor (28px grid), and cinematic motion.

## Project Overview
- **Purpose**: A personal portfolio SPA for Nicholas Yun — creative technologist, design engineer, digital craftsman.
- **Aesthetic**: Tactile Brutalism (visible structure, 1px borders, `rounded-none`) + High-End Editorial (serif typography, extreme whitespace).
- **Key Features**: 
  - **Kinetic Typography**: Font-weight responds to scroll velocity via `useWeightedScroll`.
  - **28px Grid**: Rigid background rhythm dictating all layout decisions.
  - **Machine Mode (MX)**: Terminal-style overlay for system state and build info.
  - **Dual Theme**: Perceptually uniform Night/Day themes using OKLCH.
  - **Editorial Archive**: Custom hash-routed collection spreads with magazine-style layouts.

## Tech Stack
- **Framework**: React 19 (StrictMode)
- **Language**: TypeScript 6 (Strict Mode)
  - `erasableSyntaxOnly: true` (No `enum` or `namespace`).
  - `noUncheckedIndexedAccess: true` (Handle `undefined` on index access).
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 (CSS-first, `@theme` in `src/styles/index.css`)
- **Routing**: Custom Hash-based Routing (`useRouteHash.ts`)
- **Package Manager**: pnpm (≥ 9)

## Building and Running
| Command | Purpose |
| :--- | :--- |
| `pnpm dev` | Start development server |
| `pnpm build` | Production build (compiles TS and bundles) |
| `pnpm typecheck` | **Mandatory** strict type checking (must pass before changes) |
| `pnpm preview` | Preview production build locally |

## Development Conventions

### 1. Architectural Patterns
- **Thin Orchestrator**: `App.tsx` owns all application state. Avoid context providers and state management libraries.
- **Data-Driven Content**: Portfolio items, collections, and images are ingested via `import.meta.glob` in `src/lib/content.ts`. No hardcoded content in components.
- **Zero External UI Libraries**: No shadcn/ui, Radix, Framer Motion, or React Router. All components are bespoke.
- **CSS-First Tailwind**: All design tokens are in the `@theme` block in `src/styles/index.css`. There is NO `tailwind.config.js`.

### 2. Styling Standards (Tactile Brutalism)
- **Brutalist Borders**: Use `1px solid` borders and `0px` border-radius (`rounded-none`).
- **Rounding Prohibition**: `rounded-full`, `rounded-md`, `rounded-lg`, etc., are strictly forbidden.
- **Grid Alignment**: All elements must align with the 28px grid rhythm (`--unit: 28px`).
- **Typography Hierarchy**:
  - **Editorial**: `Cormorant Garamond` (Hero headlines, section headers).
  - **Utility**: `IBM Plex Mono` (Labels, metadata, terminal text).
  - **Body**: `Inter` (Standard reading).

### 3. Engineering Rigor
- **TypeScript**: No `any`. No `enum`. Use union types for constant sets. Use early returns and composition.
- **Accessibility (WCAG AAA)**: High-contrast is mandatory. All animations must check `useReducedMotion()`.
- **Content Ingestion**: Glob paths in `src/lib/content.ts` must start with `../content/` (relative to the file).

## Directory Structure
- `/src/components`: UI primitives and composite sections.
- `/src/hooks`: System state (`useRouteHash`), motion logic (`useWeightedScroll`), and accessibility (`useReducedMotion`).
- `/src/lib`: Ingestion logic (`content.ts`), static data (`data.ts`), and types (`types.ts`).
- `/src/styles`: Tailwind `@theme` configuration and global styles.
- `/src/content`: File-system content (Markdown, images, PDFs) for the portfolio and collections.

## Troubleshooting & Critical Checks
- **Typecheck Failure**: Likely introduced an `any`, `enum`, or unhandled `undefined` from an array access.
- **Rounding Leak**: Check for any `rounded-*` classes except `rounded-none`.
- **Image Fallback**: If "NY" shows instead of images, verify `import.meta.glob` paths in `content.ts`.
- **Light Theme**: Use `.theme-day .utility-class` in CSS or `[.theme-day_&]:` arbitrary variants in JSX for light mode overrides.

Refer to `CLAUDE.md` for the **Meticulous Approach** workflow and `AGENTS.md` for high-signal technical guardrails.
