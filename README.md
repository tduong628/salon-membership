# Salon Membership Landing

Mobile-first landing site for the membership programs at John's two nail salons. Clients open it from an SMS link on their phone. One site, two salon brand worlds, a clean salon switcher.

- **Deluxe Nail Spa** (Cary): The Deluxe Standing. Onyx and brass, Playfair Display. Upscale and refined.
- **Zen Nail Spa** (Durham): The Zen Set. Terracotta and cream, Newsreader. Warm and community.

Built with Vite + React + TypeScript + Framer Motion. No backend. The Join CTA is an `sms:` deep link with a prefilled body that routes into each salon's existing Vinnie SMS flow.

## Stack

- Vite 5 + React 18 + TypeScript (strict)
- Framer Motion for all interactive and scroll motion
- CSS custom properties; the two salon worlds swap by `[data-salon]` on `<html>`
- No router dependency: salon is deep-linkable via `#/deluxe` and `#/zen`

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the built dist/
```

## Deploy (GitHub Pages, gh-pages branch)

The Vite base path is `/salon-membership/` when `GHPAGES=1` is set.

```bash
GHPAGES=1 npm run build
# publish dist/ to the gh-pages branch (git worktree or subtree)
```

Live: https://tduong628.github.io/salon-membership/

## Brand rules baked in (non-negotiable)

- No discount, percent-off, sale, deal, or coupon language anywhere. Full menu price only. The value is the perk stack, never a markdown.
- Zero emoji in customer-facing copy.
- Zero em-dashes or en-dashes in visible copy.
- WCAG AA contrast on both palettes, visible focus rings, 44px+ touch targets, reduced-motion respected.

## Source of truth

All offer numbers come verbatim from `/Volumes/Claude/John/Membership/OFFER_SPEC.md`.
Edit the offer in one place: `src/data/salons.ts`.

Design spec: `/Volumes/Claude/John/Membership/DESIGN_SPEC.md`.
