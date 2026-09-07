# Hiteshri Chavda — Portfolio

Personal portfolio site built with Next.js (App Router) and Sanity CMS. Content
(profile, skills, experience, projects) is managed in Sanity Studio and
fetched server-side; page structure, styling, and interactions live in code.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [Sanity](https://www.sanity.io) as the headless CMS, embedded at `/studio`
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript

## Getting started

This project uses **pnpm**.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site, and
[http://localhost:3000/studio](http://localhost:3000/studio) for the Sanity
Studio content editor.

### Environment variables

Copy `.env.example` to `.env.local` and fill in your Sanity project details:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (e.g. `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version |

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |

## Project structure

```
src/
  app/                 Routes (home page, Sanity Studio, icons)
  components/
    sections/          Page sections (hero, about, skills, experience, projects, contact)
    ui/                 Shared UI primitives (shadcn-based)
  lib/                  Shared utilities and static config (nav links, etc.)
  sanity/
    schemaTypes/        Content schema definitions
    lib/                 Sanity client, GROQ queries, typed fetch helpers
```

## Content model

All page content is authored in Sanity Studio:

- **Site Settings** — name, role, location, tagline, contact info
- **Skill Groups** — grouped skill lists
- **Experience** — work history entries
- **Projects** — portfolio project cards

## Deployment

Deploy as a standard Next.js app (e.g. [Vercel](https://vercel.com/new)) — no
special configuration required. The Sanity Studio route ships as part of the
same app at `/studio`.
