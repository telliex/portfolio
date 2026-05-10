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
                <h4 className="mb-2 text-base font-medium">{service.name}</h4>
                <p className="mb-4 leading-6.5 text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
                <ul className="list-none pl-4">
                  {service.list.map((item, i) => (
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
