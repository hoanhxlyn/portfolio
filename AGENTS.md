# AGENTS.md

## Quick Reference

```bash
bun install          # Install dependencies (use bun, not npm)
bun run dev          # Start dev server at http://localhost:5173
bun run build        # Production build → build/client + build/server
bun run typecheck    # Generates route types then runs tsc
bun run start        # Serve production build
bun run lint         # Run Biome linter
bun run format       # Run Biome formatter
```

## Architecture

- **Framework**: React Router v8, SPA mode (`ssr: false` in `react-router.config.ts`)
- **Styling**: Tailwind CSS v4 + shadcn/ui (base-maia style, stone base color)
- **Icons**: Phosphor Icons (`@phosphor-icons/react`) — always use the `Icon` suffix (e.g., `ArrowDownIcon`, not `ArrowDown`) as short names are deprecated in v2
- **Font**: Geist Variable (via `@fontsource-variable/geist`)
- **Hooks**: `usehooks-ts` for common hooks (`useDarkMode`, `useIntersectionObserver`, etc.)
- **Linting**: Biome (`@biomejs/biome`)
- **Package Manager**: Bun (lockfile: `bun.lock`)

## Path Aliases

`~/*` → `./app/*` (configured in `tsconfig.json`, used throughout codebase)

```tsx
import { Card } from "~/components/ui/card"
import { cn } from "~/lib/utils"
```

## Route System

- Routes defined in `app/routes.ts` using `@react-router/dev/routes`
- Route types are auto-generated in `.react-router/types/` (included in tsconfig)
- Each route exports `meta()`, `clientLoader()`, and default component
- Import route types: `import type { Route } from "./+types/<route-name>"`
- SPA mode: use `clientLoader` (not `loader`) for data fetching

## Navigation

- Use `<a href="#section">` for same-page hash/anchor scrolling (portfolio sections)
- Use `<Link to="/path">` from `react-router` for route navigation (different pages)
- Do NOT use `<a href="/path">` for route navigation — it causes full page reloads

## Data Layer

- Portfolio data: `app/data/portfolio.ts` (typed `as const` exports)
- Components import data directly — no API, no loaders needed for static content

## Hooks

- Prefer `usehooks-ts` library hooks over custom implementations
- `useDarkMode` — dark mode toggle with localStorage persistence
- `useIntersectionObserver` — element visibility tracking
- Custom hooks only when no library equivalent exists (e.g., `useActiveSection` for multi-element scroll spy)

## shadcn/ui Components

- Components live in `~/components/ui/`
- Add new components: `bunx shadcn@latest add <component-name>`
- Uses `cn` utility from `~/lib/utils` (re-exports from `cn` package)
- CSS variables defined in `app/app.css` using oklch color format
- Dark mode: `.dark` class on `<html>` element + `prefers-color-scheme` media query

## CSS Theme System

All theme tokens are CSS custom properties in `app/app.css`:
- Light mode: `:root { ... }`
- Dark mode: `.dark { ... }`
- Colors use oklch format: `oklch(lightness chroma hue)`
- Sidebar-specific tokens prefixed with `--sidebar-*`

## TypeScript Configuration

- Strict mode enabled
- `verbatimModuleSyntax: true` (use `import type` for type-only imports)
- Target: ES2022
- Module resolution: bundler

## File Structure

```
app/
  root.tsx               # Root layout, error boundary
  routes.ts              # Route definitions
  routes/                # Route components
  data/                  # Static portfolio data
  hooks/                 # Custom React hooks
  components/
    ui/                  # shadcn components
    shared/              # Reusable components (theme-toggle, etc.)
    sections/            # Page section components (hero, about, etc.)
    header.tsx           # Site header/nav
    footer.tsx           # Site footer
    section-wrapper.tsx  # Section container utility
  lib/utils.ts           # cn() utility
public/                  # Static assets
```

## Important Notes

- **Linter/Formatter**: Biome is configured (`biome.json`) — use `bun run lint` / `bun run format`
- **No test framework** configured
- Route types must be generated before typechecking (`react-router typegen`)
- SPA mode: no server-side rendering, all data loaded client-side