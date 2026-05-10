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
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h2 className="mb-5 text-lg font-medium">
          {t.selectedProjectsHeading}
        </h2>
        <div className="flex flex-col space-y-6">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectVideo src={project.video} image={project.image} />
              </div>
              <div className="px-1">
                <h3 className="mb-2 text-base font-medium">
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
                </h3>
                <p className="mb-4 text-base leading-6.5 text-zinc-600 dark:text-zinc-400">
                  {project.description[lang === 'en' ? 0 : 1]}
                </p>
                {project.list[lang].length > 0 && (
                  <ul className="list-disc pl-4">
                    {project.list[lang].map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
