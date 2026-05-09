# i18n + Theme/Language Controls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace simultaneous bilingual display with a proper EN/ZH switcher, consolidate the theme toggle into a single dropdown, and move both controls from the footer into the header.

**Architecture:** A `LanguageProvider` (React context + `localStorage`) holds the active language. All static copy lives in `lib/i18n.ts` as a typed `Record<'en'|'zh', Translations>` object. Two compact dropdowns — `ThemeDropdown` and `LangDropdown` — live in the header right side. Footer becomes text-only.

**Tech Stack:** Next.js 15, React 19, next-themes, Tailwind CSS v4, TypeScript, `hooks/useClickOutside.tsx` (existing)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `lib/i18n.ts` | All EN + ZH translation strings, `Translations` type, `Lang` type |
| Create | `lib/language-context.tsx` | `LanguageProvider`, `useLanguage()`, `useTranslations()` |
| Modify | `app/layout.tsx` | Wrap children with `<LanguageProvider>` |
| Modify | `app/footer.tsx` | Remove `ThemeSwitch`; text-only footer |
| Rewrite | `app/header.tsx` | Add `ThemeDropdown` + `LangDropdown`; use translated subtitle |
| Modify | `app/page.tsx` | Remove ZH duplicate blocks; use `useTranslations()` and `useLanguage()` |

---

## Task 1: Create `lib/i18n.ts`

**Files:**
- Create: `lib/i18n.ts`

- [ ] **Step 1: Create the file with all translation strings**

```typescript
// lib/i18n.ts

export type Lang = 'en' | 'zh'

type ServiceItem = {
  name: string
  description: string
  list: string[]
}

export type Translations = {
  headerSubtitle: string
  intro: string[]
  servicesHeading: string
  services: ServiceItem[]
  partnersHeading: string
  partnersPartnerName: string
  partnersBody: string[]
  selectedProjectsHeading: string
  workExperienceHeading: string
  blogHeading: string
  connectHeading: string
  connectIntro: string
  contactFormHeading: string
}

export const translations: Record<Lang, Translations> = {
  en: {
    headerSubtitle: 'Innovative Technology, Exceptional Solutions',
    intro: [
      "Welcome to Activo, a personal studio founded by a passionate software engineer dedicated to blending creativity with technology to deliver efficient, reliable, and forward-thinking digital solutions. I'm Telliex Chiu, the founder of Activo, with 8 years of software development experience, specializing in building modern applications and systems to help individuals and businesses achieve their goals.",
      "At Activo, we believe technology should be simple yet powerful. We excel in leveraging cutting-edge frameworks like Next.js, React, and TypeScript, combined with cloud technologies (such as AWS or Vercel) and efficient DevOps practices, to create everything from MVPs to enterprise-grade applications. Whether it's developing intuitive web apps, optimizing backend APIs, or integrating multimedia features (like video streaming and processing), we provide tailored services to meet your unique needs.",
      "Activo is built on the values of quality, transparency, and collaboration. We pay attention to every project detail, ensuring clean, maintainable code and working agilely with clients to bring ideas to life quickly. From concept design to deployment, Activo is your trusted technology partner. Let's kickstart your next project together! Contact Activo and discover how technology can bring your vision to life.",
    ],
    servicesHeading: 'Services',
    services: [
      {
        name: 'Mobile Applications',
        description:
          "Build iOS and Android applications for your brand, supporting e-commerce, booking, or social features, enabling quick launch and user engagement.",
        list: [
          '- APP architecture and feature planning',
          '- Custom architecture and features based on business model',
          '- Forum, news, social, entertainment, crypto, trading, points, etc.',
          '- Hybrid development for Android and iOS',
        ],
      },
      {
        name: 'Enterprise Web ERP Solutions',
        description:
          'Develop cloud-based subscription platforms to automate your business processes, from CRM to project management, enhancing efficiency and data insights.',
        list: [
          '- Workflow design for production management systems',
          '- Business model design for inventory management systems',
          '- Logistics management systems for various delivery methods',
          '- Custom architecture and features based on business model',
        ],
      },
      {
        name: 'E-commerce & Online Stores',
        description:
          'Create e-commerce websites for individuals or businesses, supporting product management, payment integration, and marketing tools to expand your online market presence.',
        list: [
          '- Static template design',
          '- Custom architecture and features based on business model',
          '- Shopping cart and online payment integration',
        ],
      },
      {
        name: 'AI-Enhanced Applications',
        description:
          'Integrate AI technology into your products, such as chatbots or recommendation systems, to enhance user experience and business outcomes.',
        list: ['- E-commerce product recommendations', '- Customer service automation'],
      },
    ],
    partnersHeading: 'Partners - Building the Future Together',
    partnersPartnerName: 'Awkns Labs',
    partnersBody: [
      "At Activo, we recognize that collaboration is key to driving innovation. That's why we're proud to partner with Awkns Labs, a forward-thinking team specializing in Web3 and AI technologies. Awkns Labs excels in developing decentralized applications, smart contracts, and AI-driven solutions, with deep expertise in blockchain, NFT ecosystems, and generative AI models. Their strengths perfectly complement Activo's capabilities in modern application development.",
      "Through our partnership with Awkns Labs, we offer clients a broader range of services—from traditional web applications to cutting-edge Web3 platforms and AI-enhanced personalized experiences. Whether it's building next-generation decentralized marketplaces or leveraging machine learning to optimize business processes, Activo and Awkns Labs turn technological potential into tangible results. Our collaborative approach emphasizes open communication and technical synergy, ensuring every project stands out in the fast-evolving digital landscape.",
    ],
    selectedProjectsHeading: 'Selected Projects',
    workExperienceHeading: 'Work Experience',
    blogHeading: 'Blog',
    connectHeading: 'Connect',
    connectIntro: 'Feel free to contact me at',
    contactFormHeading: 'Contact Form',
  },
  zh: {
    headerSubtitle: '創新技術，卓越解決方案',
    intro: [
      '歡迎來到 Activo，一家由熱情的軟體工程師創立的個人工作室，致力於將創意與技術融合，為客戶提供高效、可靠且前瞻性的數位解決方案。我是 Telliex Chiu，Activo 的創辦人，擁有 8 年的軟體開發經驗，專注於構建現代化應用程式與系統，幫助個人與企業實現目標。',
      '在 Activo，我們相信技術應該簡單而強大。我們擅長使用 Next.js、React、TypeScript 等前沿框架，結合雲端技術（如 AWS 或 Vercel）與高效 DevOps 實踐，打造從 MVP 到企業級應用的完整解決方案。無論是開發直觀的網頁應用、優化後端 API，還是整合多媒體功能（如影片串流與處理），我們都能提供客製化服務，滿足你的獨特需求。',
      'Activo 的核心價值在於品質、透明與協作。我們重視每一個專案細節，確保程式碼乾淨、可維護，並以敏捷方式與客戶合作，讓想法快速落地。從概念設計到部署上線，Activo 是你值得信賴的技術夥伴。讓我們一起啟動你的下一個專案！聯繫 Activo，探索技術如何為你的願景增添活力。',
    ],
    servicesHeading: '服務',
    services: [
      {
        name: '各式功能 APP 設計',
        description:
          '為您的品牌打造 iOS 和 Android 應用程式，支援電商、預約、社交等特色功能，快速啟動用戶互動。',
        list: [
          '- APP 功能架構規劃設計',
          '- 可依商業模式客製架構及功能',
          '- 論壇、新聞、交友、娛樂、虛幣、交易、點數等...',
          '- 混合開發 Android、IOS',
        ],
      },
      {
        name: '企業 Web ERP 解決方案',
        description:
          '開發雲端訂閱制平台，自動化您的業務流程，從 CRM 到項目管理，提升效率與數據洞察。',
        list: [
          '- 各類工作流程設計生產管理系統',
          '- 各類商業模式設計進銷存系統',
          '- 各類配送方式設計物流管理系統',
          '- 可依商業模式客製架構及功能',
        ],
      },
      {
        name: '電商與線上商店',
        description:
          '打造個人或企業的電商網站，支援產品管理、支付與行銷整合，助您開拓線上市場。',
        list: [
          '- 靜態版型設計',
          '- 可依商業模式客製架構及功能',
          '- 購物車、線上金流',
        ],
      },
      {
        name: 'AI 增強應用',
        description:
          '將 AI 技術融入您的產品，如聊天機器人或推薦系統，提升用戶體驗與業務成果。',
        list: ['- 電商產品推薦', '- 客服自動化'],
      },
    ],
    partnersHeading: '合作夥伴 - 共同建構未來',
    partnersPartnerName: 'Awkns Labs',
    partnersBody: [
      '在 Activo，我們深知合作是推動創新的關鍵。因此，我們很榮幸能與 Awkns Labs 建立策略夥伴關係，共同探索技術的前沿領域。Awkns Labs 是一家專注於 Web3 與 AI 技術的創新團隊，致力於打造去中心化應用、智慧合約以及人工智慧驅動的解決方案。他們在區塊鏈技術、NFT 生態系統和生成式 AI 模型的開發上擁有深厚專業知識，與 Activo 在現代應用程式開發上的實力形成完美互補。',
      '透過與 Awkns Labs 的合作，我們能夠為客戶提供更全面的服務，從傳統網頁應用到尖端的 Web3 平台，甚至是 AI 增強的個性化體驗。無論是構建下一代去中心化市場，還是利用機器學習優化業務流程，Activo 與 Awkns Labs 的聯手將技術潛力轉化為實際成果。我們的合作模式強調開放溝通與技術協同，確保每個專案都能在快速變化的數位世界中脫穎而出。',
    ],
    selectedProjectsHeading: '精選專案',
    workExperienceHeading: '工作經歷',
    blogHeading: '部落格',
    connectHeading: '聯絡',
    connectIntro: '歡迎透過以下方式聯繫我',
    contactFormHeading: '聯絡表單',
  },
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/telliex/Documents/Activo/portfolio && pnpm build 2>&1 | head -30
```

Expected: no type errors on `lib/i18n.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/i18n.ts
git commit -m "feat(): add i18n translation strings (EN + ZH)"
```

---

## Task 2: Create `lib/language-context.tsx`

**Files:**
- Create: `lib/language-context.tsx`

- [ ] **Step 1: Create the file**

```typescript
// lib/language-context.tsx
'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { translations, type Lang, type Translations } from './i18n'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('lang')
    if (stored === 'en' || stored === 'zh') {
      setLangState(stored)
    }
  }, [])

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('lang', newLang)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext)
}

export function useTranslations(): Translations {
  const { lang } = useLanguage()
  return translations[lang]
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/telliex/Documents/Activo/portfolio && pnpm build 2>&1 | head -30
```

Expected: no type errors on `lib/language-context.tsx`.

- [ ] **Step 3: Commit**

```bash
git add lib/language-context.tsx
git commit -m "feat(): add LanguageProvider, useLanguage, useTranslations hooks"
```

---

## Task 3: Update `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add `LanguageProvider` import and wrap children**

Replace the entire file with:

```typescript
// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/lib/language-context'
import Script from 'next/script'

const GA_TRACKING_ID = 'G-6ER16EJW9R'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'Activo - Innovative Technology, Exceptional Solutions',
  description:
    "At Activo, we believe technology should be simple yet powerful. We excel in leveraging cutting-edge frameworks like Next.js, React, and TypeScript, combined with cloud technologies (such as AWS or Vercel) and efficient DevOps practices, to create everything from MVPs to enterprise-grade applications. Whether it's developing intuitive web apps, optimizing backend APIs, or integrating multimedia features (like video streaming and processing), we provide tailored services to meet your unique needs.",
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <LanguageProvider>
            <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
              <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/telliex/Documents/Activo/portfolio && pnpm build 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(): wrap layout with LanguageProvider"
```

---

## Task 4: Simplify `app/footer.tsx`

**Files:**
- Modify: `app/footer.tsx`

- [ ] **Step 1: Remove `ThemeSwitch`; keep only text loop**

Replace the entire file with:

```typescript
// app/footer.tsx
'use client'
import { TextLoop } from '@/components/ui/text-loop'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <a href="https://github.com/ibelick/nim" target="_blank">
        <TextLoop className="text-xs text-zinc-500">
          <span>© 2025 Activo</span>
          <span>Built with Motion-Primitives.</span>
        </TextLoop>
      </a>
    </footer>
  )
}
```

- [ ] **Step 2: Start dev server and verify footer shows no controls**

```bash
cd /Users/telliex/Documents/Activo/portfolio && pnpm dev
```

Open http://localhost:3000 — footer should show only the text loop, no theme icons.

- [ ] **Step 3: Commit**

```bash
git add app/footer.tsx
git commit -m "feat(): simplify footer — remove ThemeSwitch, text-only"
```

---

## Task 5: Rewrite `app/header.tsx`

**Files:**
- Modify: `app/header.tsx`

- [ ] **Step 1: Replace entire file**

```typescript
// app/header.tsx
'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import useClickOutside from '@/hooks/useClickOutside'
import { useLanguage, useTranslations } from '@/lib/language-context'
import type { Lang } from '@/lib/i18n'

const THEME_OPTIONS = [
  { id: 'light', label: 'Light', Icon: SunIcon },
  { id: 'dark', label: 'Dark', Icon: MoonIcon },
  { id: 'system', label: 'System', Icon: MonitorIcon },
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
  useClickOutside(ref, () => setOpen(false))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const current =
    THEME_OPTIONS.find((o) => o.id === theme) ?? THEME_OPTIONS[0]
  const { Icon } = current

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
        aria-label="Switch theme"
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
                onClick={() => {
                  setTheme(opt.id)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 ${
                  isActive
                    ? 'bg-zinc-100 dark:bg-zinc-800'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
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
  useClickOutside(ref, () => setOpen(false))

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
        aria-label="Switch language"
        type="button"
      >
        {lang === 'en' ? 'EN' : '中'}
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
                onClick={() => {
                  setLang(opt.id)
                  setOpen(false)
                }}
                className={`flex w-full items-center px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 ${
                  isActive
                    ? 'bg-zinc-100 dark:bg-zinc-800'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
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
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          <h1 className="text-2xl font-bold">Activo | Telliex Chiu</h1>
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          {t.headerSubtitle}
        </TextEffect>
      </div>
      <div className="flex items-center gap-2">
        <ThemeDropdown />
        <LangDropdown />
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
pnpm dev
```

Open http://localhost:3000 and check:
- Header shows theme icon button and language button top-right
- Clicking the theme button opens dropdown with Light / Dark / System
- Active theme item has gray text on light background
- Clicking the language button opens dropdown with EN / 中文
- Selecting a language closes the dropdown
- Clicking outside either dropdown closes it
- Footer has no theme controls

- [ ] **Step 3: Commit**

```bash
git add app/header.tsx
git commit -m "feat(): add ThemeDropdown + LangDropdown to header"
```

---

## Task 6: Update `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add imports and hooks to `Personal` component**

At the top of the file, add the new imports alongside the existing ones:

```typescript
import { useLanguage, useTranslations } from '@/lib/language-context'
```

Inside the `Personal` component (the default export function), add at the top of the function body:

```typescript
const { lang } = useLanguage()
const t = useTranslations()
```

- [ ] **Step 2: Replace the intro section**

Find and replace the entire first `<motion.section>` block (lines ~393–450, the one containing the EN and ZH intro paragraphs) with:

```tsx
<motion.section
  variants={VARIANTS_SECTION}
  transition={TRANSITION_SECTION}
>
  <div className="mb-8 flex-1">
    {t.intro.map((paragraph, i) => (
      <p key={i} className="mb-4 leading-6.5 text-zinc-600 dark:text-zinc-400">
        {paragraph}
      </p>
    ))}
  </div>
</motion.section>
```

- [ ] **Step 3: Replace the services section**

Find and replace the entire services `<motion.section>` block (the one with `<h4>Services</h4>`, both EN and ZH `<ul>` lists and the `<hr>`) with:

```tsx
<motion.section
  variants={VARIANTS_SECTION}
  transition={TRANSITION_SECTION}
>
  <div className="mb-4 flex-1">
    <h4 className="mb-5 text-lg font-medium">{t.servicesHeading}</h4>
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
  </div>
</motion.section>
```

- [ ] **Step 4: Replace the partners section**

Find and replace the partners `<motion.section>` block (the one with `"Partners - Building the Future Together"`, EN body, and ZH body) with:

```tsx
<motion.section
  variants={VARIANTS_SECTION}
  transition={TRANSITION_SECTION}
>
  <div className="mb-4 flex-1">
    <h4 className="mb-5 text-lg font-medium">{t.partnersHeading}</h4>
    <h5 className="mb-2 text-base font-medium">
      <a
        href="https://www.canva.com/design/DAGft1ngs4E/TbyK8XrutzvT_6kfckia0Q/edit"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {t.partnersPartnerName}
      </a>
    </h5>
    {t.partnersBody.map((paragraph, i) => (
      <p key={i} className="mb-4 leading-6.5 text-zinc-600 dark:text-zinc-400">
        {paragraph}
      </p>
    ))}
  </div>
</motion.section>
```

- [ ] **Step 5: Replace section headings and connect text**

In the Selected Projects section, replace:
```tsx
<h3 className="mb-5 text-lg font-medium">Selected Projects</h3>
```
With:
```tsx
<h3 className="mb-5 text-lg font-medium">{t.selectedProjectsHeading}</h3>
```

In the Work Experience section, replace:
```tsx
<h3 className="mb-5 text-lg font-medium">Work Experience</h3>
```
With:
```tsx
<h3 className="mb-5 text-lg font-medium">{t.workExperienceHeading}</h3>
```

In the Blog section, replace:
```tsx
<h3 className="mb-3 text-lg font-medium">Blog</h3>
```
With:
```tsx
<h3 className="mb-3 text-lg font-medium">{t.blogHeading}</h3>
```

In the Connect section, replace:
```tsx
<h3 className="mb-5 text-lg font-medium">Connect</h3>
<p className="mb-5 text-zinc-600 dark:text-zinc-400">
  Feel free to contact me at{' '}
```
With:
```tsx
<h3 className="mb-5 text-lg font-medium">{t.connectHeading}</h3>
<p className="mb-5 text-zinc-600 dark:text-zinc-400">
  {t.connectIntro}{' '}
```

In the Contact Form section, replace:
```tsx
<h3 className="mb-5 text-lg font-medium">Contact Form</h3>
```
With:
```tsx
<h3 className="mb-5 text-lg font-medium">{t.contactFormHeading}</h3>
```

- [ ] **Step 6: Update project rendering to use active language**

In the Selected Projects grid, find the project card's description and list rendering:

```tsx
<p className="mb-4 text-base leading-6.5 text-zinc-600 dark:text-zinc-400">
  {project.description[0]}
</p>
<ol className="pl-4">
  {project.list['en'].map((item, index) => (
    <li className="list-disc" key={index}>
      {item}
    </li>
  ))}
</ol>
<div className="mt-4">
  <p className="text-base leading-6.5 text-zinc-600 dark:text-zinc-400">
    {project.description[1]}
  </p>
  <ol className="pl-4">
    {project.list['zh'].map((item, index) => (
      <li className="list-disc" key={index}>
        {item}
      </li>
    ))}
  </ol>
</div>
```

Replace with:

```tsx
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
```

- [ ] **Step 7: Verify in browser**

```bash
pnpm dev
```

Open http://localhost:3000 and verify:
- Page loads showing English content only (no Chinese text visible)
- Clicking language dropdown and selecting 中文 switches ALL text to Chinese
- Switching back to EN restores English
- Project descriptions and bullet lists switch language correctly
- Section headings (Services, Work Experience, Connect, etc.) switch language
- Refreshing the page with 中文 selected retains Chinese (localStorage)
- Refreshing with EN selected retains English

- [ ] **Step 8: Build check**

```bash
cd /Users/telliex/Documents/Activo/portfolio && pnpm build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Step 9: Commit**

```bash
git add app/page.tsx
git commit -m "feat(): use i18n translations in page, remove bilingual duplication"
```
