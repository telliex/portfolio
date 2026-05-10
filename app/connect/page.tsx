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
        <h2 className="mb-5 text-lg font-medium">{t.connectHeading}</h2>
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
        <h2 className="mb-5 text-lg font-medium">{t.contactFormHeading}</h2>
        <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
          <ContactForm />
        </div>
      </motion.section>
    </motion.main>
  )
}
