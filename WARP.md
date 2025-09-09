# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Purpose: side-by-side comparison scaffolding for React Hook Form (RHF) and TanStack Form (TSF)
- Stack: Next.js 15 + TypeScript, MUI v7 (with CSS variables and color schemes), Emotion
- Router: pages router (src/pages)
- Lint/format: Biome
- Note: README.md currently contains outdated Vite/preview instructions—use the Next.js commands below.

Core commands
Use your Node package manager of choice; examples below use pnpm.
- Install deps: pnpm install
- Dev (Next + Turbopack): pnpm dev
- Build (Next + Turbopack): pnpm build
- Start prod server: pnpm start
- Lint (Biome): pnpm lint
- Auto-fix (Biome): pnpm run fix
- Format (Biome): pnpm run format
- Type-check only: pnpm exec tsc --noEmit
- Tests: not configured in this repo

Architecture and code map (big picture)
- Global app wrapper: src/pages/_app.tsx
  - Sets <Head> title and viewport
  - Wraps the app in MUI ThemeProvider with cssVariables and colorSchemes (dark mode supported)
  - Applies CssBaseline
  - Renders a persistent Header before page content
- Routing: src/pages
  - index.tsx → “Simple” page
  - nested.tsx → “Nested” page
- Layout primitives: src/components/layout
  - Header.tsx: MUI AppBar with centered label derived from router.pathname and a color mode toggle
  - PageContainer.tsx: Container + outlined Paper wrapping page content and an ActionBar
- Common UI: src/components/common
  - ColorModeToggle.tsx: toggles MUI color scheme via useColorScheme (SSR-safe)
  - ActionBar.tsx: simple RHF/TSF chips and an action button placeholder
- Path alias: tsconfig.json maps @/* → ./src/*
- Static assets: public/*.svg

What to prefer (and avoid) when working here
- Prefer Next.js pages router conventions (src/pages) for new routes
- Use MUI v7 theme variables and useColorScheme for dark/light mode; avoid custom color mode plumbing
- Follow Biome for lint/format; do not add ESLint/Prettier unless the repo introduces them explicitly
- Ignore README’s Vite/preview commands; this project is not using Vite

That’s it — this file intentionally focuses on repo-specific workflows and structure without restating generic practices.

