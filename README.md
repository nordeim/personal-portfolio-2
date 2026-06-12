# Nicholas Yun Portfolio — The Engineered Soul

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](package.json)
[![Stack](https://img.shields.io/badge/stack-React_19_|_TS_6_|_Vite_6_|_Tailwind_4-indigo.svg)](package.json)
[![Aesthetic](https://img.shields.io/badge/aesthetic-Tactile_Brutalism-black.svg)](AGENTS.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#license)

An avant-garde **Digital Installation** that balances **Tactile Brutalism** (visible structure, mono utility, 1px borders) with **High-End Editorial** (serif typography, extreme whitespace, cinematic motion). Not a portfolio — a statement against generic web aesthetics.

## Overview

**What**: A personal portfolio SPA for Nicholas Yun — creative technologist, design engineer, digital craftsman.

**Why**: In an age of AI-generated sameness (purple gradients, Inter/Roboto safety, predictable card grids), this project rejects convergence. Every design decision answers a dual thesis: *does this serve the tension between the mathematical and the emotional, or does it safely retreat to the middle?*

**How**: Built on a rigid 28px grid with kinetic typography (font-weight responds to scroll velocity), hash-based routing (no external router), data-driven content ingestion via `import.meta.glob`, and a custom Machine Mode overlay that exposes the system's raw state.

## Key Features

| Feature | Description |
| :--- | :--- |
| 🎭 **Kinetic Typography** | Hero headlines dynamically change `font-weight` (200–950) based on scroll velocity via `useWeightedScroll` hook |
| 📐 **28px Grid** | Mathematically rigid, visible background grid rhythm that dictates every pixel of the layout |
| 🏗️ **Asymmetric Bento** | Non-linear portfolio grid with category-specific typographic textures (Mono for Code, Serif for Poetry) |
| 🔧 **Machine Mode (MX)** | Terminal-style overlay revealing build info, raw JSON state, route data, and collection counts |
| 🎨 **Dual Theme** | Night/Day toggle with OKLCH-based color system for perceptual uniformity across both themes |
| 📜 **Editorial Archive** | Hash-routed collection spreads with magazine-style layouts for poetry, photography, and experiments |
| 🌾 **Grain Overlay** | CSS noise texture layer at `z-[9999]` adding tactile, analog "human fingerprint" to the digital canvas |
| ♿ **WCAG AAA** | High-contrast brutalism with `prefers-reduced-motion` support, skip link, meaningful `alt` text, focus-visible |

## Architecture

### Tech Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | React | 19.0 | Concurrent rendering, StrictMode |
| **Language** | TypeScript | 6.0 | Strict typing, `erasableSyntaxOnly`, `noUncheckedIndexedAccess` |
| **Build Tool** | Vite | 6.3 | Zero-latency HMR, `import.meta.glob` content ingestion |
| **Styling** | Tailwind CSS | 4.1 | CSS-first `@theme` — no `tailwind.config.js` |
| **Routing** | Custom Hook | — | Hash-based routing for Archive Spreads |
| **Package Manager** | pnpm | ≥ 9 | Dependency management |

### Architectural Principles

1. **Thin Orchestrator** — `App.tsx` owns all state. No context providers, no state management libraries. Max prop drilling depth: 2.
2. **Data-Driven Content** — All portfolio content loaded via `import.meta.glob` with frontmatter parsing. No hardcoded content in components.
3. **Zero External UI Libraries** — No shadcn/ui, no Radix, no Framer Motion, no React Router. All 15 components are bespoke.
4. **CSS-First Tailwind** — All design tokens in `@theme` block inside `src/styles/index.css`. No JavaScript config file.
5. **Motion Gating** — Every animation checks `useReducedMotion()`. Global CSS disables all transitions for `prefers-reduced-motion: reduce`.

## File Hierarchy

```
📂 src/
├── 📄 App.tsx                 # Thin orchestrator — all state lifted here
├── 📄 main.tsx                # React 19 StrictMode entry
├── 📂 components/
│   ├── 📄 HeroKinetic.tsx     # Viewport-scaled hero + pointer parallax + kinetic typography
│   ├── 📄 AboutFlow.tsx       # Asymmetric editorial with stable-height sizer pattern
│   ├── 📄 BentoGrid.tsx       # 12-column asymmetric portfolio grid
│   ├── 📄 BentoTile.tsx       # Category-textured project tile
│   ├── 📄 ArchiveSpread.tsx   # Dual-view collection display (grid + detail)
│   ├── 📄 ArchiveItemCard.tsx # Collection item card
│   ├── 📄 ContentBody.tsx     # Poetry/prose renderer (category-aware)
│   ├── 📄 Navigation.tsx      # Sticky nav + MX toggle + mobile drawer
│   ├── 📄 MachineOverlay.tsx  # Terminal-style data overlay (MX mode)
│   ├── 📄 ContactSection.tsx  # Contact + social links + footer
│   ├── 📄 GrainOverlay.tsx    # Fixed CSS noise overlay (z-9999)
│   ├── 📄 BrandMark.tsx       # SVG brand mark
│   ├── 📄 SocialIcon.tsx      # Inline SVG social icons
│   └── 📄 ThemeToggle.tsx     # Day/night toggle button
├── 📂 hooks/
│   ├── 📄 useWeightedScroll.ts # Scroll velocity → font-weight mapping (rAF-throttled)
│   ├── 📄 useRouteHash.ts     # Hash-based routing (hashchange + load)
│   └── 📄 useReducedMotion.ts # prefers-reduced-motion detection
├── 📂 lib/
│   ├── 📄 types.ts            # All TypeScript interfaces
│   ├── 📄 content.ts          # import.meta.glob ingestion + frontmatter parsing
│   └── 📄 data.ts             # Static data (heroSlides, pillars, projects, collections)
├── 📂 styles/
│   └── 📄 index.css           # Tailwind @theme tokens + grid + typography + grain + themes
└── 📂 content/                # File-system content (portrait, portfolio, collections)
```

## Quick Start

### Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 9

### Installation

```bash
# 1. Clone
git clone https://github.com/your-username/personal-portfolio.git
cd personal-portfolio

# 2. Install
pnpm install

# 3. Start dev server
pnpm dev
```

### Verify Setup

```bash
# Type checking (mandatory before any code change)
pnpm typecheck
# Expected: exit code 0, no output

# Production build
pnpm build
# Expected: ✓ built in <1s, dist/ directory created
```

## Design System

### Typography

| Class | Font | Size | Weight | Use |
| :--- | :--- | :--- | :--- | :--- |
| `.type-kinetic-hero` | Cormorant Garamond | `clamp(4rem, 9vw, 9rem)` | 950 (variable) | Hero headline |
| `.type-editorial-h2` | Cormorant Garamond | `clamp(2.2rem, 4.2vw, 4.5rem)` | 700 | Section heads |
| `.type-editorial-h3` | Cormorant Garamond | `clamp(1.5rem, 2.5vw, 2.5rem)` | 600 | Sub-heads |
| `.type-mono-util` | IBM Plex Mono | `0.78rem` | 500 | Labels, metadata |
| `.type-body` | Inter | `clamp(1rem, 1.35vw, 1.22rem)` | 400 | Paragraphs |

### Accent Colors

| Token | Hex | Category |
| :--- | :--- | :--- |
| `--color-accent-code` | `#2457ff` | Code / Engineering |
| `--color-accent-design` | `#ff5c35` | Design / Visual |
| `--color-accent-art` | `#00a77f` | Art / Generative |
| `--color-accent-photo` | `#f2b705` | Photography |
| `--color-accent-poetry` | `#8f55ff` | Poetry / Writing |
| `--color-accent-story` | `#e5488b` | Storytelling |
| `--color-accent-experiments` | `#16a3b8` | Experiments / Lab |

### Z-Index Layer Map

| Layer | Z-Index | Element |
| :--- | :--- | :--- |
| Grid background | `0` | `::before` pseudo on theme classes |
| Hero content | `1` | Main hero elements |
| Hero nav buttons | `2` | Prev/next arrows |
| Skip link | `20` | Skip-to-content link |
| Navigation | `30` | Sticky header |
| Mobile backdrop | `35` | Menu overlay |
| Mobile drawer | `40` | Aside drawer |
| Machine overlay | `50` | MX dialog |
| Grain overlay | `9999` | Noise texture (always on top, `pointer-events: none`) |

## Troubleshooting

| Issue | Cause | Fix |
| :--- | :--- | :--- |
| `pnpm typecheck` fails after changes | Introduced `any`, `enum`, or unused vars | Check for `any` types, replace `enum` with union types, remove unused imports |
| Content images show "NY" fallback | `import.meta.glob` path mismatch | Verify paths in `content.ts` start with `../content/` (relative to `src/lib/`) |
| Light theme styles don't apply | Wrong CSS specificity syntax | Use `.theme-day .utility-class` in CSS, `[.theme-day_&]:` in JSX classNames |
| Mobile menu locks scrolling | `useEffect` cleanup missing | Ensure `document.body.style.overflow` resets in cleanup function |
| Build fails on GitHub Pages | Incorrect base path | Verify `base: './'` in `vite.config.ts` |
| `erasableSyntaxOnly` error | Using `enum` or `namespace` | Replace with union types: `type Icon = 'mail' \| 'linkedin'` |

## Contributing

This project follows the **Meticulous Approach** for all changes. See [CLAUDE.md](./CLAUDE.md) for the six-phase workflow (Analyze → Plan → Validate → Implement → Verify → Deliver).

1. Ensure `pnpm typecheck` passes with zero errors
2. Maintain the **Tactile Brutalist** aesthetic — `rounded-none` only, `1px solid` borders
3. Reject generic components; use the project's established design system
4. All animations must check `useReducedMotion()`
5. No external UI libraries — all components are bespoke

## License

Distributed under the MIT License. See `LICENSE` for more information.

*Engineering the soul, one pixel at a time.*
