# Desktop Nav & Multi-Page Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive top navbar and split the portfolio into 4 App Router pages (`/`, `/services`, `/projects`, `/connect`), merging the Partners section into the Home intro.

**Architecture:** Extract shared motion constants and two components (ProjectVideo, MagneticSocialLink) from `app/page.tsx` into their own files so sub-pages can import them. Rewrite `app/header.tsx` as a full-width responsive navbar with hamburger on mobile. Restructure `app/layout.tsx` to place the navbar outside the content container. Create three new page files for Services, Projects, and Connect. Trim Home page to Intro+Partners body+WorkExperience+Blog only.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, `motion/react`, `next-themes`, `lucide-react`, existing custom hooks (`useClickOutside`), existing UI primitives (`Spotlight`, `MorphingDialog`, `Magnetic`, `AnimatedBackground`, `TextEffect`).

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `lib/motion.ts` | Shared motion animation constants |
| Create | `app/components/ProjectVideo.tsx` | Vimeo/image media component |
| Create | `app/components/MagneticSocialLink.tsx` | Magnetic social link button |
| Rewrite | `app/header.tsx` | Responsive top navbar (desktop row + mobile drawer) |
| Modify | `app/layout.tsx` | Move Header outside content container |
| Rewrite | `app/page.tsx` | Home: Intro+Partners body+WorkExperience+Blog only |
| Create | `app/services/page.tsx` | Services section page |
| Create | `app/projects/page.tsx` | Selected Projects page |
| Create | `app/connect/page.tsx` | Connect + Contact Form page |

---

### Task 1: Extract motion constants to `lib/motion.ts`

**Files:**
- Create: `lib/motion.ts`

These constants are currently defined at the top of `app/page.tsx`. All new sub-pages need them — extract them first so every task after this can import from one place.

- [ ] **Step 1: Create `lib/motion.ts`**

```typescript
// lib/motion.ts
export const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export const TRANSITION_SECTION = {
  duration: 0.3,
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/motion.ts
git commit -m "refactor(): extract motion constants to lib/motion.ts"
```

---

### Task 2: Extract `ProjectVideo` to `app/components/ProjectVideo.tsx`

**Files:**
- Create: `app/components/ProjectVideo.tsx`

`ProjectVideo` is a large client component (lines 45–350 of `app/page.tsx`). The `/projects` page needs it; it should not live in page.tsx any more.

- [ ] **Step 1: Create `app/components/ProjectVideo.tsx`**

Copy the full `ProjectVideo` component and its types out of `app/page.tsx`:

```tsx
// app/components/ProjectVideo.tsx
'use client'
import { useState, useEffect } from 'react'
import { XIcon } from 'lucide-react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'

type ProjectVideoProps = {
  src: string
  image?: string
}

type VimeoVideoFile = {
  quality: string
  type: string
  width: number
  height: number
  link: string
}

type VimeoApiResponse = {
  files?: VimeoVideoFile[]
}

export function ProjectVideo({ src, image }: ProjectVideoProps) {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const isVimeoLink = src && src.includes('vimeo.com')

  const getVimeoId = (vimeoUrl: string): string => {
    const regex =
      /(?:vimeo\.com\/(?:manage\/videos\/|video\/|channels\/[\w-]+\/|groups\/[\w-]+\/videos\/|album\/\d+\/video\/|)(\d+))/i
    const match = vimeoUrl.match(regex)
    return match && match[1] ? match[1] : ''
  }

  useEffect(() => {
    if (!src) {
      setVideoUrl('')
      setIsLoading(false)
      return
    }
    if (!isVimeoLink) {
      setVideoUrl(src)
      setIsLoading(false)
      return
    }
    const videoId = getVimeoId(src)
    if (!videoId) {
      setError('Invalid Vimeo URL')
      setIsLoading(false)
      return
    }
    const fetchVimeoData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `https://api.vimeo.com/videos/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_API_TOKEN}`,
              'Content-Type': 'application/json',
              Accept: 'application/vnd.vimeo.*+json;version=3.4',
            },
          },
        )
        if (!response.ok) throw new Error(`Vimeo API error: ${response.status}`)
        const data: VimeoApiResponse = await response.json()
        if (data.files && data.files.length > 0) {
          const mp4Files = data.files.filter((file) => file.type.includes('mp4'))
          const sortedFiles = mp4Files.sort((a, b) => b.width - a.width)
          setVideoUrl(
            sortedFiles.length > 0
              ? sortedFiles[0].link
              : `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`,
          )
        } else {
          setVideoUrl(`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`)
        }
      } catch (err) {
        console.error('Error fetching Vimeo data:', err)
        setError('Failed to load video')
        setVideoUrl(`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchVimeoData()
  }, [src, isVimeoLink])

  const getVimeoEmbedUrl = (vimeoUrl: string): string => {
    const videoId = getVimeoId(vimeoUrl)
    if (!videoId) return ''
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&background=1&muted=1`
  }

  const vimeoEmbedUrl = isVimeoLink ? getVimeoEmbedUrl(src) : ''

  if (isLoading) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="animate-pulse text-zinc-500 dark:text-zinc-400">Loading video...</div>
      </div>
    )
  }

  if ((!src || (error && !videoUrl)) && image) {
    return (
      <div className="group relative aspect-video w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
          <div className="rounded-full bg-white/80 p-3 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
              <path d="M15 3h6v6"></path>
              <path d="M10 14 21 3"></path>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            </svg>
          </div>
        </div>
        <img src={image} alt="Project preview" className="h-full w-full cursor-zoom-in object-cover" />
      </div>
    )
  }

  if (error && !videoUrl && !image) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <MorphingDialog transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
      <MorphingDialogTrigger>
        <div className="group relative aspect-video w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <div className="rounded-full bg-white/80 p-3 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </div>
          </div>
          {isVimeoLink && !videoUrl.includes('mp4') ? (
            <div className="h-full w-full cursor-zoom-in">
              <iframe src={vimeoEmbedUrl} className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" frameBorder="0" title="Vimeo Video"></iframe>
            </div>
          ) : videoUrl ? (
            <video src={videoUrl} autoPlay loop muted playsInline className="h-full w-full cursor-zoom-in object-cover" onError={(e) => { console.error('Video failed to load:', e); setError('Failed to load video') }} />
          ) : image ? (
            <img src={image} alt="Project preview" className="h-full w-full cursor-zoom-in object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
              <div className="text-zinc-500 dark:text-zinc-400">No media available</div>
            </div>
          )}
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50/90 p-1 ring-1 ring-zinc-200/50 backdrop-blur-sm ring-inset dark:bg-zinc-950/90 dark:ring-zinc-800/50">
          {isVimeoLink && !videoUrl.includes('mp4') ? (
            <iframe src={videoUrl} className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]" allow="autoplay; fullscreen; picture-in-picture" frameBorder="0" title="Vimeo Video Player"></iframe>
          ) : videoUrl ? (
            <video src={videoUrl} autoPlay loop muted playsInline controls className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]" />
          ) : image ? (
            <img src={image} alt="Project preview" className="aspect-video h-[50vh] w-full rounded-xl object-contain md:h-[70vh]" />
          ) : (
            <div className="flex aspect-video h-[50vh] w-full items-center justify-center rounded-xl bg-zinc-100 md:h-[70vh] dark:bg-zinc-800">
              <div className="text-zinc-500 dark:text-zinc-400">No media available</div>
            </div>
          )}
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white/90 p-2 shadow-lg transition-transform hover:scale-110 dark:bg-zinc-800/90 dark:text-zinc-200"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { delay: 0.3, duration: 0.1 } },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-300" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/ProjectVideo.tsx
git commit -m "refactor(): extract ProjectVideo to app/components/ProjectVideo.tsx"
```

---

### Task 3: Extract `MagneticSocialLink` to `app/components/MagneticSocialLink.tsx`

**Files:**
- Create: `app/components/MagneticSocialLink.tsx`

This component is currently in `app/page.tsx` (lines ~352–384). The `/connect` page needs it.

- [ ] **Step 1: Create `app/components/MagneticSocialLink.tsx`**

```tsx
// app/components/MagneticSocialLink.tsx
'use client'
import { Magnetic } from '@/components/ui/magnetic'

export function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/MagneticSocialLink.tsx
git commit -m "refactor(): extract MagneticSocialLink to app/components/MagneticSocialLink.tsx"
```

---

### Task 4: Rewrite `app/header.tsx` as responsive Navbar

**Files:**
- Modify: `app/header.tsx`

Replace the current static header with a full responsive navbar. Desktop shows logo + nav links + controls in one row. Mobile shows logo + hamburger; clicking hamburger opens a slide-down drawer with nav links and controls.

Active link is detected via `usePathname()` from `next/navigation`.

- [ ] **Step 1: Rewrite `app/header.tsx`**

```tsx
// app/header.tsx
'use client'
import { useState, useCallback, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronDownIcon,
  MenuIcon,
  XIcon,
  SunIcon,
  MoonIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import useClickOutside from '@/hooks/useClickOutside'
import { useLanguage, useTranslations } from '@/lib/language-context'
import type { Lang } from '@/lib/i18n'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/connect', label: 'Connect' },
]

const THEME_OPTIONS = [
  { id: 'light', label: 'Light', Icon: SunIcon },
  { id: 'dark', label: 'Dark', Icon: MoonIcon },
] as const

const LANG_OPTIONS: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'zh', label: '中文' },
]

function ThemeDropdown() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const handleOutside = useCallback(() => setOpen(false), [])
  useClickOutside(ref, handleOutside)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const current = THEME_OPTIONS.find((o) => o.id === theme) ?? THEME_OPTIONS[0]
  const { Icon } = current

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
        aria-label="Switch theme"
        aria-expanded={open}
        type="button"
      >
        <Icon className="h-3.5 w-3.5" />
        <ChevronDownIcon className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-28 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          {THEME_OPTIONS.map((opt) => {
            const isActive = theme === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => { setTheme(opt.id); setOpen(false) }}
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 ${
                  isActive ? 'bg-zinc-100 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`}
              >
                <opt.Icon className="h-3.5 w-3.5" />
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function LangDropdown() {
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const handleOutside = useCallback(() => setOpen(false), [])
  useClickOutside(ref, handleOutside)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
        aria-label="Switch language"
        aria-expanded={open}
        type="button"
      >
        {lang === 'en' ? 'EN' : '中文'}
        <ChevronDownIcon className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-24 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          {LANG_OPTIONS.map((opt) => {
            const isActive = lang === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => { setLang(opt.id); setOpen(false) }}
                className={`flex w-full items-center px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 ${
                  isActive ? 'bg-zinc-100 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const t = useTranslations()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-screen-sm px-4">
        {/* Main nav row */}
        <div className="flex items-center justify-between py-3">
          {/* Left: logo + desktop nav links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-black dark:text-white">
              Activo | Telliex Chiu
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                        : 'text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
          {/* Right: controls + hamburger */}
          <div className="flex items-center gap-2">
            <ThemeDropdown />
            <LangDropdown />
            <button
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 md:hidden"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              type="button"
            >
              {menuOpen
                ? <XIcon className="h-5 w-5" />
                : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {/* Subtitle — desktop only */}
        <p className="hidden pb-2 text-sm text-zinc-500 dark:text-zinc-500 md:block">
          {t.headerSubtitle}
        </p>
      </div>
      {/* Mobile drawer */}
      {menuOpen && (
        <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="mx-auto w-full max-w-screen-sm px-4 py-2">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                        : 'text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/header.tsx
git commit -m "feat(): rewrite header as responsive top navbar with mobile drawer"
```

---

### Task 5: Restructure `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

Move `<Header />` outside the `max-w-screen-sm` content container so it spans full width. Remove `pt-20` (old spacing for when Header was inside the container and positioned via margin) and replace with `py-8`.

- [ ] **Step 1: Modify `app/layout.tsx`**

Replace the `<body>` contents (inside `<ThemeProvider>` / `<LanguageProvider>`):

**Before:**
```tsx
<div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
  <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
    <Header />
    {children}
    <Footer />
  </div>
</div>
```

**After:**
```tsx
<div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
  <Header />
  <div className="mx-auto w-full max-w-screen-sm flex-1 px-4 py-8">
    {children}
    <Footer />
  </div>
</div>
```

- [ ] **Step 2: Build to verify layout renders**

```bash
pnpm build
```

Expected: build succeeds with no errors. Confirm in `pnpm dev` that the header appears full-width at the top and content starts below it with correct spacing.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(): move navbar outside content container for full-width desktop layout"
```

---

### Task 6: Rewrite `app/page.tsx` — Home page

**Files:**
- Modify: `app/page.tsx`

Home page keeps: Intro + Partners body (merged, no separate heading) + Work Experience + Blog. Everything else (Services, Partners heading+link, Projects, Connect, Contact Form) is removed.

- [ ] **Step 1: Replace `app/page.tsx` with the trimmed Home page**

```tsx
// app/page.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDownIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { AnimatedBackground } from '@/components/ui/animated-background'
import Link from 'next/link'
import { WORK_EXPERIENCE, BLOG_POSTS } from './data'
import { useLanguage, useTranslations } from '@/lib/language-context'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  TRANSITION_SECTION,
} from '@/lib/motion'

export default function Personal() {
  const { lang } = useLanguage()
  const t = useTranslations()
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null)

  function toggleJob(id: string) {
    setExpandedJobId((prev) => (prev === id ? null : id))
  }

  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* Intro + Partners body merged */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="mb-8 flex-1">
          {t.intro.map((paragraph, i) => (
            <p key={i} className="mb-4 leading-6.5 text-zinc-600 dark:text-zinc-400">
              {paragraph}
            </p>
          ))}
          {t.partnersBody.map((paragraph, i) => (
            <p key={`partner-${i}`} className="mb-4 leading-6.5 text-zinc-600 dark:text-zinc-400">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.section>

      {/* Work Experience */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h3 className="mb-5 text-lg font-medium">{t.workExperienceHeading}</h3>
        <div className="flex flex-col space-y-2">
          {WORK_EXPERIENCE.map((job) => {
            const isExpanded = expandedJobId === job.id
            const hasDetails = job.details[lang].length > 0
            return (
              <div
                className="relative overflow-hidden rounded-2xl bg-zinc-300/20 p-[1px] dark:bg-zinc-600/20"
                key={job.id}
              >
                <Spotlight
                  className="from-zinc-900/50 via-zinc-800/50 to-zinc-700/50 blur-2xl dark:from-zinc-100/50 dark:via-zinc-200/50 dark:to-zinc-50/50"
                  size={64}
                />
                <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                  <button
                    className="flex w-full flex-row items-start justify-between text-left"
                    onClick={() => hasDetails && toggleJob(job.id)}
                    aria-expanded={isExpanded}
                  >
                    <div>
                      <h4 className="font-normal dark:text-zinc-100">{job.title}</h4>
                      <p className="text-zinc-500 dark:text-zinc-400">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {job.start} - {job.end}
                      </p>
                      {hasDetails && (
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-zinc-400 dark:text-zinc-500"
                        >
                          <ChevronDownIcon className="h-4 w-4" />
                        </motion.span>
                      )}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-3 space-y-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                          {job.details[lang].map((item, i) => (
                            <li
                              key={i}
                              className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* Blog */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        {BLOG_POSTS.length > 0 && (
          <h3 className="mb-3 text-lg font-medium">{t.blogHeading}</h3>
        )}
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">{post.title}</h4>
                  <p className="text-zinc-500 dark:text-zinc-400">{post.description}</p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>
    </motion.main>
  )
}
```

- [ ] **Step 2: Type-check and build**

```bash
pnpm tsc --noEmit && pnpm build
```

Expected: clean build. Home page shows intro paragraphs (including partners body text flowing after them), work experience cards, blog section.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(): trim home page — intro+partners body+workex+blog only"
```

---

### Task 7: Create `/services` page

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create `app/services/page.tsx`**

```tsx
// app/services/page.tsx
'use client'
import { motion } from 'motion/react'
import { useTranslations } from '@/lib/language-context'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  TRANSITION_SECTION,
} from '@/lib/motion'

export default function ServicesPage() {
  const t = useTranslations()
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h3 className="mb-5 text-lg font-medium">{t.servicesHeading}</h3>
        <ul className="list-disc space-y-6">
          {t.services.map((service) => (
            <li key={service.name}>
              <div>
                <h5 className="mb-2 text-base font-medium">{service.name}</h5>
                <p className="mb-4 leading-6.5 text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
                <ol className="pl-4">
                  {service.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.main>
  )
}
```

- [ ] **Step 2: Build**

```bash
pnpm build
```

Expected: `/services` route appears in build output. Navigate to `http://localhost:3000/services` in dev and confirm the 4 service items render with correct language.

- [ ] **Step 3: Commit**

```bash
git add app/services/page.tsx
git commit -m "feat(): add /services page"
```

---

### Task 8: Create `/projects` page

**Files:**
- Create: `app/projects/page.tsx`

- [ ] **Step 1: Create `app/projects/page.tsx`**

```tsx
// app/projects/page.tsx
'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLanguage, useTranslations } from '@/lib/language-context'
import { PROJECTS } from '@/app/data'
import { ProjectVideo } from '@/app/components/ProjectVideo'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  TRANSITION_SECTION,
} from '@/lib/motion'

export default function ProjectsPage() {
  const { lang } = useLanguage()
  const t = useTranslations()
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h3 className="mb-5 text-lg font-medium">{t.selectedProjectsHeading}</h3>
        <div className="flex flex-col space-y-6">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectVideo src={project.video} image={project.image} />
              </div>
              <div className="px-1">
                <h5 className="mb-2 text-base font-medium">
                  {project.link ? (
                    <Link
                      href={project.link}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.name}
                    </Link>
                  ) : (
                    <span>{project.name}</span>
                  )}
                </h5>
                <p className="mb-4 text-base leading-6.5 text-zinc-600 dark:text-zinc-400">
                  {project.description[lang === 'en' ? 0 : 1]}
                </p>
                {project.list[lang].length > 0 && (
                  <ol className="pl-4">
                    {project.list[lang].map((item, index) => (
                      <li className="list-disc" key={index}>
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
```

- [ ] **Step 2: Build**

```bash
pnpm build
```

Expected: `/projects` route in build output. Navigate to `http://localhost:3000/projects` in dev and confirm all 8 projects render with video/image and correct bilingual description.

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat(): add /projects page"
```

---

### Task 9: Create `/connect` page

**Files:**
- Create: `app/connect/page.tsx`

- [ ] **Step 1: Create `app/connect/page.tsx`**

```tsx
// app/connect/page.tsx
'use client'
import { motion } from 'motion/react'
import { useTranslations } from '@/lib/language-context'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import { MagneticSocialLink } from '@/app/components/MagneticSocialLink'
import ContactForm from '@/app/components/ContactForm'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  TRANSITION_SECTION,
} from '@/lib/motion'

export default function ConnectPage() {
  const t = useTranslations()
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h3 className="mb-5 text-lg font-medium">{t.connectHeading}</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          {t.connectIntro}{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h3 className="mb-5 text-lg font-medium">{t.contactFormHeading}</h3>
        <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
          <ContactForm />
        </div>
      </motion.section>
    </motion.main>
  )
}
```

- [ ] **Step 2: Final build**

```bash
pnpm build
```

Expected: all 4 routes (`/`, `/services`, `/projects`, `/connect`) in build output, zero errors.

- [ ] **Step 3: Commit**

```bash
git add app/connect/page.tsx
git commit -m "feat(): add /connect page"
```
