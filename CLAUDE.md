# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

Package manager: **pnpm** (not npm or yarn).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_VIMEO_API_TOKEN` | Vimeo API — fetches direct MP4 links for project videos |
| `SENDGRID_API_KEY` | SendGrid — sends contact form emails |
| `CONTACT_FORM_TO_EMAIL` | Recipient email for contact form submissions |
| `CONTACT_FORM_FROM_EMAIL` | Verified SendGrid sender email |

## Architecture

**Next.js 15 App Router** (React 19) single-page portfolio for Activo studio (founder: Telliex Chiu).

### Key Files

- `app/data.ts` — single source of truth for all content: `PROJECTS`, `WORK_EXPERIENCE`, `BLOG_POSTS`, `SOCIAL_LINKS`, `EMAIL`. Update here to change displayed content.
- `app/page.tsx` — main page (`'use client'`). Renders all sections using data from `app/data.ts`. Contains `ProjectVideo` component that handles Vimeo API + direct video + image fallback logic.
- `app/layout.tsx` — root layout with Google Analytics (GA4), `next-themes` dark mode, Geist font, fixed max-width container.
- `app/api/contact/route.ts` — POST handler for contact form; sends email via SendGrid with optional file attachment.
- `components/ui/` — animated UI primitives (Spotlight, Magnetic, MorphingDialog, AnimatedBackground, etc.) used throughout the page.

### Content Model (`app/data.ts`)

`Project` entries have bilingual content — `description[0]` is English, `description[1]` is Traditional Chinese; `list.en` and `list.zh` are bullet points. Projects support either a Vimeo URL (`video`), a local image path (`image`), or both (video preferred, image as fallback).

### MDX Blog

Blog posts live at `app/blog/[slug]/page.mdx`. They are currently commented out in `BLOG_POSTS` in `data.ts`. MDX is configured in `next.config.mjs` with `@next/mdx`.

### Styling

Tailwind CSS v4 with `@tailwindcss/typography` for prose. Prettier with `prettier-plugin-tailwindcss` for class sorting. Dark mode is class-based via `next-themes`.

### Video Handling

`ProjectVideo` in `app/page.tsx`:
1. Calls Vimeo API to get direct MP4 link (requires `NEXT_PUBLIC_VIMEO_API_TOKEN`)
2. Falls back to Vimeo iframe embed if no MP4 available
3. Falls back to static image if video fails or is absent
