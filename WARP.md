# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4 + Zustand. Uses Turbopack for dev/build.
- Entry points: `src/app/layout.tsx` (root) and route-group layout `src/app/(shop)/layout.tsx` (adds TopMenu + Sidebar around shop pages).
- Path alias: `@/*` → `src/*` (see `tsconfig.json`).
- Styling: Tailwind via `src/app/globals.css` (custom CSS variables, utility classes, and component classes like `.btn-primary`). `cn()` utility merges class names (`src/lib/utils.ts`).
- Fonts: configured in `src/config/fonts.ts` (Geist, Inter, Montserrat Alternates) and applied in `src/app/layout.tsx`.
- State: UI state with Zustand in `src/store/ui/ui-store.ts` (toggles side menu). `TopMenu` calls `openSideMenu`; `Sidebar` reads `isSideMenuOpen` and renders overlay.
- Data: Demo catalog from `src/seed/seed.ts`; product images in `public/products/*`.

Common commands
- Development server (Turbopack):
```bash path=null start=null
npm run dev
```
- Build (Turbopack) and start production server:
```bash path=null start=null
npm run build
npm start
```
- Lint entire project (Flat ESLint):
```bash path=null start=null
npm run lint -- .
```
- Lint a single file and auto-fix:
```bash path=null start=null
npm run lint -- src/components/ui/top-menu/TopMenu.tsx --fix
```
- Tests: No test framework or scripts are configured.

Routing and architecture
- App Router under `src/app/`.
  - Catalog home: `src/app/(shop)/page.tsx` renders `PageTitle` + `ProductGrid` with products from `initialData`.
  - Product detail: `src/app/(shop)/product/[slug]/page.tsx` (client component) finds product by slug from seed and renders gallery (`ProductSlideshow` with Swiper), size/quantity selectors, price, and description. Falls back to `notFound()` if missing.
  - Category listing: `src/app/(shop)/category/[id]/page.tsx` filters by `Gender` (see `src/interfaces/product.interface.ts`) and uses `PageTitle` + `ProductGrid`. Custom 404 at `not-found.tsx`.
  - Cart flow scaffolding: `src/app/(shop)/cart/page.tsx` shows mock items with `ProductCart`; orders pages exist as placeholders under `src/app/(shop)/orders`.
  - Auth group: `src/app/auth/*` has its own layout and placeholder pages.
- Components
  - UI shell: `TopMenu`, `Sidebar` (+ `SidebarSection`, `SidebarMenuItem`) compose the chrome. Sidebar items come from config in `src/config/components/sidebar.config.ts`.
  - Catalog UI: `products/product-grid/*` renders grids and items linking to product slugs. `product/*` includes size/quantity selectors and Swiper-based slideshows.
- Types and utilities
  - Product domain types in `src/interfaces/product.interface.ts` (Product, Gender, Size, Type).
  - Classname merge helper `cn()` in `src/lib/utils.ts`.

Notes for agents
- Client vs server: Many interactive components declare `"use client"` and depend on Zustand or browser-only libraries (e.g., Swiper). Keep SSR boundaries in mind when moving logic.
- Assets: When adding products to the seed, ensure `public/products/` contains matching filenames; the UI resolves `src` as `/products/<name>`.
- Config-driven nav: Update `src/config/components/sidebar.config.ts` to change Sidebar entries; the UI auto-renders sections based on `section`.
