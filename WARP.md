# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository overview
- Purpose: Compare React Hook Form (react-hook-form) vs TanStack Form (@tanstack/react-form) with side-by-side examples. Current src content is the Vite template and will be replaced by comparison components.
- Stack: React + TypeScript + Vite
- UI: MUI (@mui/material, @mui/icons-material) with Emotion
- Package manager: pnpm (pnpm-lock.yaml present)
- Linting: Biome (via @biomejs/biome)
- Testing: No test runner configured in package.json

Common commands
- Install dependencies
  - pnpm install
- Start dev server (Vite, default port 5173)
  - pnpm dev
  - Custom port example: pnpm dev -- --port 5174
- Build (TypeScript project references + Vite build; output to dist/)
  - pnpm build
- Preview production build locally
  - pnpm preview
- Lint (Biome)
  - pnpm lint
  - Auto-fix: pnpm run fix
  - Format only: pnpm run format
- Type-check only (no emit)
  - pnpm exec tsc -b

High-level architecture
- Entry and bootstrapping
  - index.html defines a #root container and loads /src/main.tsx
  - src/main.tsx mounts React StrictMode and renders <App /> into #root
- Application shell
  - src/App.tsx is the current root component (template counter). It will be replaced by RHF/TSF comparison components.
  - Styles in src/App.css; global stylesheet src/index.css (currently empty)
- Build and tooling
  - Vite config (vite.config.ts): @vitejs/plugin-react enabled; otherwise default Vite behavior
  - TypeScript configuration uses project references (tsconfig.json) pointing to:
    - tsconfig.app.json for app source (bundler moduleResolution, noEmit, strict checks)
    - tsconfig.node.json for Vite/node-side files (vite.config.ts)
  - Biome is used for linting/formatting. No ESLint config is committed. README includes guidance for type-aware ESLint which is superseded by Biome in this project.
- Assets
  - Local assets under src/assets/ (e.g., react.svg)
  - index.html references /vite.svg (served from public/ if present)

Notable installed libraries
- Forms: react-hook-form, @tanstack/react-form
- UI: @mui/material, @mui/icons-material, @emotion/react, @emotion/styled
- Tailwind: Removed (no Tailwind plugin in Vite, no Tailwind directives in styles)

Important notes from README.md
- The project is based on the Vite React + TS template.
- README suggests enabling type-aware ESLint rules; this project uses Biome instead. Reintroduce ESLint only if needed and align scripts accordingly.

Conventions and paths
- SPA mount point: index.html -> #root -> src/main.tsx -> <App />
- Build output: dist/
- Vite dev server default URL: http://localhost:5173

MCP Tools Usage
- This repository uses MCP tools to keep guidance up-to-date and to perform validation without a local test runner.
- Tools and when to use:
  - mui: When working with MUI components (designing, implementing, or modifying), consult the MCP tool "mui" before making changes to confirm component APIs, recommended usage patterns, and accessibility guidance.
  - context7: Before starting any task involving React Hook Form or TanStack Form, call the MCP tool "context7" to fetch the latest best practices, API changes, and migration notes.
  - playwright: After completing coding tasks, validate the implementation using the MCP tool "playwright".
