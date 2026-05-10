// app/header.tsx
'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import useClickOutside from '@/hooks/useClickOutside'
import { useLanguage, useTranslations } from '@/lib/language-context'
import type { Lang } from '@/lib/i18n'

const THEME_OPTIONS = [
  { id: 'light', label: 'Light', Icon: SunIcon },
  { id: 'dark', label: 'Dark', Icon: MoonIcon }
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
