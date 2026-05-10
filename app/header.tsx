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
            <Link href="/" className="text-black dark:text-white">
              <h1 className="text-xl font-bold">Activo | Telliex Chiu</h1>
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
