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
            <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-geist)]">
              <Header />
              <div className="mx-auto w-full max-w-screen-sm flex-1 px-4 py-8">
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
