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
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="mb-8 flex-1">
          {t.intro.map((paragraph, i) => (
            <p
              key={i}
              className="mb-4 leading-6.5 text-zinc-600 dark:text-zinc-400"
            >
              {paragraph}
            </p>
          ))}
          {t.partnersBody.map((paragraph, i) => (
            <p
              key={`partner-${i}`}
              className="mb-4 leading-6.5 text-zinc-600 dark:text-zinc-400"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </motion.section>

      {/* Work Experience */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h2 className="mb-5 text-lg font-medium">{t.workExperienceHeading}</h2>
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
                      <h3 className="font-normal dark:text-zinc-100">
                        {job.title}
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {job.company}
                      </p>
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
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        {BLOG_POSTS.length > 0 && (
          <h2 className="mb-3 text-lg font-medium">{t.blogHeading}</h2>
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
                  <h3 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>
    </motion.main>
  )
}
