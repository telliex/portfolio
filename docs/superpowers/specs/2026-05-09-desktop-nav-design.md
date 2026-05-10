# Desktop Nav & Multi-Page Layout Design

**Date:** 2026-05-09
**Status:** Approved

## Summary

Add a desktop-optimised top navbar and split the current single-page portfolio into 4 App Router pages (Home, Services, Projects, Connect). Mobile layout is unchanged except the header gains a hamburger menu. Partners section is merged into the Home intro — no separate heading.

---

## Goals

- Desktop: full-width horizontal navbar with Logo, Nav links, Theme/Lang controls
- Mobile: navbar collapses to hamburger menu (slide-down drawer)
- 4 distinct URLs: `/`, `/services`, `/projects`, `/connect`
- Active page link highlighted via `usePathname()`
- Partners body text merged into Home intro; Partners section heading removed
- Zero new npm dependencies

---

## Architecture

### File Changes

**Modified**

| File | Change |
|---|---|
| `app/layout.tsx` | Pull `<Header>` outside content container; remove `pt-20`; widen content padding |
| `app/header.tsx` | Full rewrite — responsive Navbar (desktop row + mobile drawer) |
| `app/page.tsx` | Keep Intro+Partners body+WorkExperience+Blog; remove Services/Partners heading/Projects/Connect sections |

**New**

| File | Content |
|---|---|
| `app/services/page.tsx` | Services 4 items (client component, uses `useTranslations()`) |
| `app/projects/page.tsx` | Selected Projects 8 items (client, uses `useLanguage()` + `useTranslations()`, imports `ProjectVideo`) |
| `app/connect/page.tsx` | Connect social links + email + Contact Form (client, uses `useTranslations()`) |

---

## Component Design

### Navbar (`app/header.tsx`)

```
Desktop (≥768px):
┌────────────────────────────────────────────────────────┐
│  Activo | Telliex Chiu   Home  Services  Projects  Connect   ☀️▾  EN▾  │
│  Innovative Technology, Exceptional Solutions                           │
└────────────────────────────────────────────────────────┘

Mobile (<768px) — closed:
┌─────────────────────────┐
│  Activo | Telliex Chiu  ☰  │
└─────────────────────────┘

Mobile — open:
┌─────────────────────────┐
│  Activo | Telliex Chiu  ✕  │
├─────────────────────────┤
│  Home                   │
│  Services               │
│  Projects               │
│  Connect                │
│  ☀️▾   EN▾             │
└─────────────────────────┘
```

**State:** `const [menuOpen, setMenuOpen] = useState(false)`

**Active link detection:** `const pathname = usePathname()` — active when `pathname === href` (or `pathname === '/'` for Home)

**Active style:** `bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg`

**Inactive style:** `text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg`

**Mobile drawer:** renders below header bar, full-width, `border-t border-zinc-200 dark:border-zinc-800`, white/zinc-950 background. Closes on nav link click.

**ThemeDropdown + LangDropdown:** moved from current header, behaviour unchanged. In mobile drawer these appear at the bottom of the nav list.

**Subtitle:** `t.headerSubtitle` rendered in a second row below the nav row, `text-sm text-zinc-500 dark:text-zinc-400`. Hidden in mobile (subtitle not shown when menu closed or open).

---

### `app/layout.tsx` restructure

```tsx
<body>
  <ThemeProvider ...>
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Header />                          {/* full-width, outside content container */}
        <div className="mx-auto w-full max-w-screen-sm flex-1 px-4 py-8">
          {children}
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  </ThemeProvider>
</body>
```

Remove the old wrapper `div` with `pt-20 relative`.

---

### Home page (`app/page.tsx`)

**Sections kept:**
1. Intro — `t.intro.map(...)` paragraphs, then immediately `t.partnersBody.map(...)` paragraphs appended in the same `<motion.section>` (no heading between them)
2. Work Experience — unchanged (expandable cards)
3. Blog — unchanged

**Sections removed:** Services `<motion.section>`, Partners `<motion.section>` (heading + partner name link), Projects `<motion.section>`, Connect `<motion.section>`, Contact Form `<motion.section>`

**Imports removed:** `ContactForm`, `MorphingDialog*`, `MagneticSocialLink`, `AnimatedBackground`, `XIcon` (if only used by removed sections)

---

### `/services` page (`app/services/page.tsx`)

```tsx
'use client'
// imports: motion, useTranslations, VARIANTS_CONTAINER, VARIANTS_SECTION, TRANSITION_SECTION
export default function ServicesPage() {
  const t = useTranslations()
  return (
    <motion.main variants={VARIANTS_CONTAINER} initial="hidden" animate="visible">
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h3 className="mb-5 text-lg font-medium">{t.servicesHeading}</h3>
        <ul className="list-disc space-y-6">
          {t.services.map((service) => ( ... ))}
        </ul>
      </motion.section>
    </motion.main>
  )
}
```

The animation constants (`VARIANTS_CONTAINER`, `VARIANTS_SECTION`, `TRANSITION_SECTION`) are currently defined inside `app/page.tsx`. They must be extracted to a shared file `app/lib/motion.ts` so all pages can import them.

---

### `/projects` page (`app/projects/page.tsx`)

```tsx
'use client'
// imports: motion, useLanguage, useTranslations, PROJECTS, ProjectVideo, MorphingDialog*, XIcon
// ProjectVideo is currently a local function in page.tsx — must be extracted to app/components/ProjectVideo.tsx
export default function ProjectsPage() {
  const { lang } = useLanguage()
  const t = useTranslations()
  return (
    <motion.main ...>
      <motion.section ...>
        <h3 className="mb-5 text-lg font-medium">{t.selectedProjectsHeading}</h3>
        <div className="space-y-6">
          {PROJECTS.map((project) => ( ... ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
```

---

### `/connect` page (`app/connect/page.tsx`)

```tsx
'use client'
// imports: motion, useTranslations, SOCIAL_LINKS, EMAIL, MagneticSocialLink, ContactForm, AnimatedBackground
export default function ConnectPage() {
  const t = useTranslations()
  return (
    <motion.main ...>
      <motion.section ...>
        <h3 ...>{t.connectHeading}</h3>
        <p ...>{t.connectIntro} <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <div className="flex ...">
          {SOCIAL_LINKS.map((link) => <MagneticSocialLink .../>)}
        </div>
      </motion.section>
      <motion.section ...>
        <h3 ...>{t.contactFormHeading}</h3>
        <ContactForm />
      </motion.section>
    </motion.main>
  )
}
```

---

## Shared Extractions Required

Two pieces currently inside `app/page.tsx` must be extracted before new pages can import them:

1. **`app/lib/motion.ts`** — exports `VARIANTS_CONTAINER`, `VARIANTS_SECTION`, `TRANSITION_SECTION`
2. **`app/components/ProjectVideo.tsx`** — the `ProjectVideo` function + its types (`ProjectVideoProps`, `VimeoVideoFile`, `VimeoApiResponse`)

---

## Data Flow

```
usePathname() → Navbar active link
useTranslations() → all page text (services, projects, connect, home intro)
useLanguage() → project description[0|1], project.list[lang]
PROJECTS / WORK_EXPERIENCE / BLOG_POSTS / SOCIAL_LINKS / EMAIL → from app/data.ts (unchanged)
```

---

## Out of Scope

- Changing `max-w-screen-sm` content width
- Adding page-level metadata (`<title>`) per route (can be done later)
- Animations between page transitions
- Changing the Footer
