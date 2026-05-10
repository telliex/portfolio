// app/services/page.tsx
'use client'
import { motion } from 'motion/react'
import { useLanguage, useTranslations } from '@/lib/language-context'
import { SERVICES } from '@/app/data'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  TRANSITION_SECTION,
} from '@/lib/motion'

export default function ServicesPage() {
  const t = useTranslations()
  const { lang } = useLanguage()
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h2 className="mb-5 text-lg font-medium">{t.servicesHeading}</h2>
        <ul className="list-disc space-y-6">
          {SERVICES.map((service) => (
            <li key={service.name.en}>
              <div>
                <h3 className="mb-2 text-base font-medium">{service.name[lang]}</h3>
                <p className="mb-4 leading-6.5 text-zinc-600 dark:text-zinc-400">
                  {service.description[lang]}
                </p>
                <ul className="list-none pl-4">
                  {service.list[lang].map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.main>
  )
}
