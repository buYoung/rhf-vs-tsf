# RHF vs TSF (React Hook Form vs TanStack Form)

Compare React Hook Form and TanStack Form side-by-side with simple, focused examples.

## Tech Stack
- Next.js 15 + TypeScript
- UI: MUI v7 (@mui/material, @mui/icons-material) with Emotion
- Package manager: pnpm
- Linting/Formatting: Biome
- Testing: Not configured

## Getting Started
- Install dependencies
  - `pnpm install`
- Start dev server (Next.js + Turbopack, default port 3000)
  - `pnpm dev`
  - Custom port example: `pnpm dev -- -p 4000`
- Build (production)
  - `pnpm build`
- Start production server
  - `pnpm start`
- Lint / Auto-fix / Format
  - `pnpm lint`
  - `pnpm run fix`
  - `pnpm run format`
- Type-check only
  - `pnpm exec tsc --noEmit`

## App Structure (pages router)
- Global wrapper: `src/pages/_app.tsx`
  - Sets `<Head>` title/viewport
  - Wraps the app in MUI `ThemeProvider` with cssVariables and colorSchemes (dark mode)
  - Applies `CssBaseline`
  - Renders a persistent `Header` before page content
- Routes: `src/pages`
  - `index.tsx` → “Simple” page
  - `nested.tsx` → “Nested” page
- Layout primitives: `src/components/layout`
  - `Header.tsx`: AppBar with centered label derived from `router.pathname` and a color mode toggle
  - `PageContainer.tsx`: Container + outlined Paper wrapping page content and an `ActionBar`
- Common UI: `src/components/common`
  - `ColorModeToggle.tsx`: toggles MUI color scheme via `useColorScheme` (SSR-safe)
  - `ActionBar.tsx`: simple RHF/TSF chips and an action button placeholder
- Path alias: `tsconfig.json` maps `@/*` → `./src/*`
- Static assets: `public/*.svg`

## Current Status
- Basic MUI layout + dark/light mode toggle
- Two pages available: `/` (Simple) and `/nested` (Nested)

## Roadmap
- Implement form examples for both libraries:
  - Simple data forms
  - Nested/field-array forms
- Add validation strategies and UX comparisons

## License
MIT — see [LICENSE](./LICENSE)
