# Portfolio handoff

## Product

- **Final name:** Maksim Zhuparov — Frontend Portfolio
- **Short description:** A bilingual, product-minded frontend portfolio that
  turns 8 application projects into concise, honest engineering case studies.
- **User problem:** A recruiter, client or engineering peer can quickly
  understand what Maksim builds, how each product works, what is verified and
  how to contact him.

## Maksim’s contribution

The site’s information architecture, RU/EN content model, product case-study
format, current visual system, responsive behavior, accessibility treatment,
SEO, browser verification and release configuration were built as a substantial
standalone adaptation of an MIT-licensed starting template. Project descriptions
avoid unverified metrics and distinguish current implementation from future work.

## Stack

Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Motion, Radix UI,
Content Collections/MDX, Zod, ESLint, Playwright, GitHub Actions and Vercel.

## Main capabilities

1. Product-led hero and clear work/contact paths.
2. 8 project cards with truthful release stages and technology summaries.
3. Dedicated RU/EN case-study pages with current scope, challenges,
   architecture, provenance and next release step.
4. URL-persistent RU/EN switching across home and project pages.
5. System-aware light/dark theme with reduced-motion support.
6. Accessible navigation, focus states, semantic headings and live copy feedback.
7. Localized metadata, canonical/hreflang, JSON-LD, OG image, robots and sitemap.
8. Self-contained lint, MDX, production build and Playwright browser checks.

## Architecture

Static-first Next.js App Router site. Typed data under `src/data` feeds server
components for both locales; a small client boundary handles theme, language URL
preservation, media fallback and clipboard feedback. No backend, database, auth
or secrets are required. `NEXT_PUBLIC_SITE_URL` gates production canonical URLs
and indexing.

## URLs

- **GitHub:** https://github.com/godaylor/personal-portfolio
- **Live:** pending account-authenticated Vercel deployment and production URL
  verification.

## Best screenshots

- `docs/screenshots/portfolio-production-desktop-1440.png`
- `docs/screenshots/portfolio-production-tablet-820.png`
- `docs/screenshots/portfolio-production-mobile-390.png`
- `docs/screenshots/portfolio-dark-contact.png`

## Licensing and provenance

The original Magic UI Portfolio import is preserved in Git history under the MIT
license. The original copyright notice remains in `LICENSE`; the modification
copyright, detailed attribution and third-party notices are documented in
`LICENSE`, `ATTRIBUTION.md` and `THIRD_PARTY_NOTICES.md`. Current product imagery
is CSS-generated or captured from this site; no upstream project screenshots are
presented as original work.

## Production status

The production build and complete local browser scenario work: both locales,
all 16 localized project pages, theme/language transitions, copy feedback,
contacts, 404, responsive widths, OG/icon/robots/sitemap and runtime error checks.
A public production URL was not independently verified in this pass because the
saved GitHub CLI credential is invalid and no authenticated Vercel CLI is
available. Do not mark public deployment complete until that final release step
passes.
