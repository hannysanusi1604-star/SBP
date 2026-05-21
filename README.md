# Aspire Lounge Switzerland — Digital Buffet Menu

A premium, mobile-first web app designed for QR-code access at tables inside Swiss airport lounges. Built with Next.js 14 (App Router), React 18, TypeScript and Tailwind CSS.

## Experience

- **Calm Swiss-minimalist UI** — ivory, navy and gold palette with Cormorant Garamond serifs and Inter for body.
- **Browse the buffet** with sticky category navigation, filtering by diet, search, and elegant dish detail sheets with allergen + sourcing data.
- **Drinks & water station** information panels.
- **Dietary & allergen guide** with refined custom icons.
- **Suite Lounge premium ordering** with discreet table-side requests, live status tracking and confirmation.
- **Multilingual** — English, French, German, Italian, Arabic (with RTL).
- **Guest feedback** — overall, food and service ratings + per-dish rating.
- **Floating help / call-a-host** button.
- **PWA-ready** with manifest + maskable icon.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/` — Next.js App Router pages (`/`, `/menu`, `/drinks`, `/dietary`, `/premium`, `/about`, `/feedback`).
- `components/` — UI building blocks (Header, MenuExplorer, MenuCard, DishDetail, LanguageSwitcher, FloatingHelp, etc.).
- `lib/menu-data.ts` — dish catalogue (CMS-ready: replace with a fetch).
- `lib/translations.ts` — locale dictionaries.
