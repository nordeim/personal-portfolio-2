Summary of what I've validated:

WHAT the project is:
- A personal portfolio SPA for Nicholas Yun (Creative Technologist / Design Engineer / Digital Craftsman)
- "Tactile Brutalism + High-End Editorial" aesthetic
- "Post-AI Authenticity" - a statement against generic web design

WHY the project exists:
- To showcase Nicholas Yun's work across multiple creative disciplines (code, design, poetry, photography, art, storytelling)
- To serve as a statement against generic "AI slop" web design


- To balance mathematical rigor with emotional expression

HOW it's built:
- React 19, TypeScript 6 (strict mode), Vite 6, Tailwind CSS v4
- Custom hash-based routing, no external UI libraries
- Data-driven content ingestion using import.meta.glob
- 28px grid system with brutalist styling and 0px border-radius
- Three-tier typography system with a dual theme (Night/Day) in OKLCH
- Thin Orchestrator pattern where App.tsx manages all state

Validation findings:

1. Tech Stack - VERIFIED
   - React 19, TypeScript 6, Vite 6, Tailwind v4 all confirmed in package.json
   - No tailwind.config.js exists (CSS-first approach)
   - @tailwindcss/vite plugin in vite.config.ts

2. TypeScript Config - VERIFIED
   - strict: true, noUncheckedIndexedAccess: true, erasableSyntaxOnly: true
   - Path alias @/* → ./src/* configured
   - Typecheck passes with zero errors

3. 28px Grid - VERIFIED
   - --unit: 28px defined in @theme block in index.css
   - 28px background grid with ::before pseudo-elements
   - Used consistently throughout components (px-28px, gap-28px, etc.)

4. Brutalist Borders - VERIFIED
   - Global * { border-radius: 0px !important; } enforced
   - 16 components using rounded-none consistently
   - Zero instances of rounded-md, rounded-lg, rounded-sm, or rounded-full

5. Hash Routing - VERIFIED
   - useRouteHash.ts custom hook manages window.location.hash
   - App.tsx parses routes as #collection/{slug} or #collection/{slug}/{item}
   - No react-router-dom in dependencies

6. Content Ingestion - VERIFIED
   - import.meta.glob in src/lib/content.ts with correct ../content/ relative paths
   - Eager loading enabled for the portfolio's ~20 files
   - isCollectionGuideFile() properly excludes PUT_*_HERE.md files

7. Thin Orchestrator - VERIFIED
   - App.tsx owns all 5 state variables: activeHeroIndex, isNightMode, isMenuOpen, isMachineOpen, and routeHash
   - No context providers anywhere
   - Maximum prop drilling depth of 2 levels (App → Navigation → ThemeToggle)

8. Typography - VERIFIED
   - Three-tier system with Cormorant Garamond for editorial, IBM Plex Mono for utility, and Inter for body text
   - Defined in @theme as --font-editorial, --font-utility, and --font-body

9. Accessibility - VERIFIED
   - Skip-to-content link, focus-visible styles with 3px outline, and prefers-reduced-motion media query
   - useReducedMotion hook used in HeroKinetic, AboutFlow, and useWeightedScroll
   - GrainOverlay and BrandMark marked as decorative with aria-hidden="true"

10. No External UI Libraries - VERIFIED
    - Only React and React-DOM in dependencies, no shadcn, Radix, Framer Motion, or React Router
    - All components are custom-built

11. TypeScript Quality - VERIFIED
    - Zero instances of any types or enum declarations
    - SocialLink.icon properly uses a union type instead of enum

12. Stable React Keys - VERIFIED
    - Using stable key patterns like tag-${index}-${tag}, dot-${index}, poem-line-${index}, and prose-para-${index} throughout

13. ContentBody - VERIFIED
    - Splitting content by newlines and filtering empty lines, with poetry receiving special treatment for line-by-line rendering

14. MachineOverlay - VERIFIED
    - Terminal-style overlay with build version, route, and collection data, using rounded-none styling

15. BentoTile - VERIFIED
    - Mapping categories to texture types (mono, serif, sans, image) with asymmetric grid spans and accent color on top borders

16. Light Theme - VERIFIED
    - CSS uses .theme-day .utility-class selectors and Tailwind uses [.theme-day_&]: variants for overrides

17. HeroKinetic - VERIFIED
    - Kinetic typography driven by useWeightedScroll, respecting reduced motion preferences with a static 950 weight fallback, plus pointer parallax and auto-rotation features

18. SocialIcon - VERIFIED
    - Union type for icon variants instead of enum, using Record mapping for SVG paths

19. BrandMark - VERIFIED
    - Minimal geometric "N" letterform in SVG, marked as decorative

20. Collection Slug Mismatch - CONFIRMED
    - The collectionDefinitions slug is experiments, but the physical directory is web-experiments, which creates a path mismatch since getCollectionItems expects the slug to match the directory name

.

Now I'm checking which collections have actual content files to understand the scope of this mismatch.
# List contents of each collection dir in .
$ for dir in src/content/collections/*/; do echo "=== $(basename $dir) ==="; ls "$dir" 2>/dev/null; done
=== artworks ===
PUT_ARTWORKS_HERE.md
visual-study.md
=== design ===
PUT_DESIGN_WORK_HERE.md
birthday-card-experiments.md
=== photography ===
PUT_PHOTOGRAPHY_HERE.md
photo-note.md
=== poetry ===
…

Now I see the mismatch clearly. The collectionDefinitions in data.ts has slug experiments, but the physical directory is web-experiments. This means getCollectionItems('experiments') would look for files in a folder named experiments which doesn't exist - it would find nothing.

Also, there are additional physical directories (artworks, design, stories) that aren't in collectionDefinitions.

Let me also note that there are 6 physical collection directories but only 3 collection definitions in data.ts.

Let me now compile the full analysis and report.
Here is my comprehensive analysis and validation of the project documentation against the codebase.
Deep Analysis: Nicholas Yun Portfolio v2.0
WHAT — Project Identity
An avant-garde personal portfolio SPA for Nicholas Yun (Creative Technologist / Design Engineer / Digital Craftsman). It is positioned as a "Digital Installation" — not a typical portfolio website, but a statement against generic web design ("AI Slop"). The core aesthetic thesis is Tactile Brutalism + High-End Editorial: visible 28px grid rhythms, 1px borders, zero border-radius, combined with serif typography, extreme whitespace, and kinetic motion.
WHY — Design Philosophy
The project exists at the intersection of mathematical rigor and emotional expression. Every design decision must answer: "Does this serve the tension between the mathematical and the emotional, or does it safely retreat to the middle?" It rejects purple gradients, safe font pairings, predictable card grids, and any external UI library — everything is bespoke to preserve structural authenticity.
HOW — Architecture
Layer	Implementation
Framework	React 19, TypeScript 6 (strict), Vite 6
Styling	Tailwind CSS v4, CSS-first @theme config (no tailwind.config.js)
Routing	Custom hash-based (useRouteHash.ts) — no react-router
State	Thin Orchestrator in App.tsx — no context providers, no state libraries
Content	import.meta.glob in src/lib/content.ts — file-system driven ingestion
Accessibility	WCAG AAA baseline — skip link, focus-visible, reduced motion gating
Validation Matrix
#	Documentation Claim	Codebase Evidence	Status
1	React 19, TS 6, Vite 6, Tailwind 4	package.json deps: react ^19, typescript ^6, vite ^6.3, tailwindcss ^4.1	VERIFIED
2	strict: true, noUncheckedIndexedAccess, erasableSyntaxOnly	tsconfig.json:17-22 — all three flags present	VERIFIED
3	@/* → src/* path alias	tsconfig.json:29-31 + vite.config.ts:11 both configured	VERIFIED
4	No tailwind.config.js	Confirmed absent. src/styles/index.css:3-46 has @theme block	VERIFIED
5	28px grid rhythm	index.css:5 --unit: 28px; index.css:70-81 visible grid via ::before	VERIFIED
6	Global border-radius: 0px !important	index.css:52-54 — *, *::before, *::after { border-radius: 0px !important; }	VERIFIED
7	Zero rounded-md/lg/sm/full in src/	rg matches only documentation files (AGENTS.md, CLAUDE.md, etc.), zero in component code	VERIFIED
8	Custom hash routing (no react-router)	src/hooks/useRouteHash.ts — listens to hashchange event. No router in deps	VERIFIED
9	Thin Orchestrator in App.tsx	App.tsx:28-33 owns: activeHeroIndex, isNightMode, isMenuOpen, isMachineOpen. No context providers	VERIFIED
10	Max prop drilling depth = 2	App → Navigation → ThemeToggle is the deepest chain	VERIFIED
11	import.meta.glob paths start with ../content/	content.ts:8-36 — all 6 glob patterns use ../content/ prefix	VERIFIED
12	eager: true for content loading	content.ts:10 { eager: true, import: 'default', query: '?url' }	VERIFIED
13	isCollectionGuideFile() excludes PUT_*_HERE.md	content.ts:52-55 — checks startsWith('PUT_') and endsWith('_HERE.md')	VERIFIED
14	Three-tier typography (Cormorant Garamond / IBM Plex Mono / Inter)	index.css:40-42 — --font-editorial, --font-utility, --font-body	VERIFIED
15	Kinetic typography via useWeightedScroll	useWeightedScroll.ts — maps scroll velocity to font-weight 200-950	VERIFIED
16	Reduced motion returns static 950	useWeightedScroll.ts:19-22 — if (prefersReduced) { setFontWeight(950); return; }	VERIFIED
17	useReducedMotion checked in animations	Used in HeroKinetic.tsx:27, AboutFlow.tsx:14, useWeightedScroll.ts:10	VERIFIED
18	Skip-to-content link	App.tsx:84-89 — <a href="#main-content" ...> with focus-visible reveal	VERIFIED
19	Focus-visible: 3px solid rgba(36,87,255,0.35)	index.css:181-184 — exact values match	VERIFIED
20	prefers-reduced-motion media query	index.css:190-196 — sets transition/animation duration to 0.01ms	VERIFIED
21	No any types in src/	rg ": any" src/ — zero matches	VERIFIED
22	No enum in src/	rg "enum " src/ — zero matches	VERIFIED
23	SocialLink.icon uses union type	types.ts:54 — icon: 'mail' | 'linkedin' | 'instagram' | 'github' | 'wix'	VERIFIED
24	Stable React keys (para-${index} pattern)	ContentBody.tsx:14,30 — poem-line-${index}, prose-para-${index}	VERIFIED
25	No external UI libraries	Only react and react-dom in deps. Zero shadcn/Radix/Framer	VERIFIED
26	Light theme: .theme-day .utility-class CSS	index.css:96-118 — all overrides use .theme-day .bg-surface etc.	VERIFIED
27	BentoTile category-texture mapping	BentoTile.tsx:11-27 — code/experiments→mono, poetry/story→serif, etc.	VERIFIED
28	MachineOverlay uses rounded-none	MachineOverlay.tsx:41,50 — all border-radius is rounded-none	VERIFIED
29	pnpm typecheck passes	Ran pnpm typecheck — zero errors	VERIFIED
30	pnpm as exclusive package manager	pnpm-lock.yaml and pnpm-workspace.yaml present	VERIFIED
Critical Finding: Collection Slug Mismatch
The collectionDefinitions in src/lib/data.ts:160 defines slug experiments, but the physical directory is src/content/collections/web-experiments/. Since getCollectionItems() matches by extractFolderName(path) !== collectionSlug, the experiments collection will always return an empty array — no content will ever load for #collection/experiments.
Additionally, there are 6 physical collection directories (artworks, design, photography, poetry, stories, web-experiments) but only 3 definitions in collectionDefinitions (poetry, photography, experiments). The artworks, design, and stories directories have content files but no corresponding collection definitions.
Additional Observations
1. SocialIcon.tsx:13 includes a 'wix' icon variant in the union type and iconPaths Record, but data.ts:173-197 only defines mail, linkedin, instagram, github — the wix variant is defined but unused.
2. GrainOverlay is a pure decorative element (aria-hidden="true") with no props — minimal and correct.
3. BrandMark renders a geometric "N" letterform in SVG — fully bespoke, no external icon library.
4. content.ts:43 uses ?. (optional chaining) on split('/').pop() — properly handles the noUncheckedIndexedAccess constraint.
5. HeroKinetic.tsx:29 uses ReturnType<typeof setInterval> for the auto-rotate ref — proper TypeScript pattern avoiding number type assumption.
Conclusion
The three documentation files (AGENTS.md, CLAUDE.md, GEMINI.md) are highly accurate and tightly aligned with the actual codebase. All 30 major claims validated successfully. The single material issue is the collection slug mismatch (experiments vs web-experiments), which is a functional bug that would prevent content loading for that collection.

