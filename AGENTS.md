# AGENTS.md

## Quick Reference

```bash
bun install          # Install dependencies (use bun, not npm)
bun run dev          # Start dev server at http://localhost:5173
bun run build        # Production build → build/client + build/server
bun run typecheck    # Generates route types then runs tsc
bun run start        # Serve production build
```

## Architecture

- **Framework**: React Router v8 with SSR enabled (`react-router.config.ts`)
- **Styling**: Tailwind CSS v4 + shadcn/ui (base-maia style, stone base color)
- **Icons**: Phosphor Icons (`@phosphor-icons/react`)
- **Font**: Geist Variable (via `@fontsource-variable/geist`)
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
- Each route exports `meta()`, `loader()`, and default component
- Import route types: `import type { Route } from "./+types/<route-name>"`

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
  root.tsx           # Root layout, error boundary, meta
  routes.ts          # Route definitions
  routes/            # Route components
  components/ui/     # shadcn components
  lib/utils.ts       # cn() utility
  welcome/           # Welcome page assets
public/              # Static assets (favicon.ico)
```

## Important Notes

- **No linter/formatter configured** (no ESLint, Prettier, or Biome)
- **No test framework** configured
- Route types must be generated before typechecking (`react-router typegen`)
