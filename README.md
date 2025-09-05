# RHF vs TSF (React Hook Form vs TanStack Form)

Compare React Hook Form and TanStack Form side-by-side with simple, focused examples.

## Tech Stack
- React + TypeScript + Vite
- UI: MUI (@mui/material, @mui/icons-material) with Emotion
- Package manager: pnpm
- Linting/Formatting: Biome
- Testing: Not configured

## Getting Started
- Install dependencies
  - `pnpm install`
- Start dev server (Vite, default port 5173)
  - `pnpm dev`
  - Custom port example: `pnpm dev -- --port 5174`
- Build
  - `pnpm build`
- Preview production build
  - `pnpm preview`
- Lint / Auto-fix / Format
  - `pnpm lint`
  - `pnpm run fix`
  - `pnpm run format`
- Type-check only
  - `pnpm exec tsc -b`

## App Structure
- Entry: `index.html` → `src/main.tsx` → `<App />`
- Layout: `src/layout/AppLayout.tsx`
  - Header: MUI AppBar with two buttons (Simple Data, Nested Data)
  - Body: centered content area
- Pages:
  - `src/pages/SimpleDataPage.tsx`
  - `src/pages/NestedDataPage.tsx`
- Navigation: state-based (`useState`) toggle between pages
- Theming: `ThemeProvider` + `CssBaseline` applied in `src/main.tsx`

## Current Status
- Basic MUI layout implemented
- Two pages render centered text placeholders:
  - "Simple Data Page"
  - "Nested Data Page"

## Roadmap
- Implement form examples for both libraries:
  - Simple data forms
  - Nested/field-array forms
- Add validation strategies and UX comparisons

## License
MIT — see [LICENSE](./LICENSE)
