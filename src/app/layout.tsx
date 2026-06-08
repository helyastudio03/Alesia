import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Alesia — Instruction en Famille',
    template: '%s — Alesia',
  },
  description:
    "Alesia est une plateforme d'instruction en famille fondée sur une vision éducative assumée : former des individus complets, transmettre des savoirs enracinés, progresser par la maîtrise.",
  keywords: ['instruction en famille', 'IEF', 'homeschooling', 'éducation', 'curriculum', 'programme scolaire', 'leçons'],
  authors: [{ name: 'Alesia' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Alesia',
    title: 'Alesia — Instruction en Famille',
    description:
      "Une plateforme d'instruction en famille fondée sur une vision éducative cohérente : quatre domaines, trois âges de progression, la maîtrise comme seul critère.",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Alesia — Instruction en Famille',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alesia — Instruction en Famille',
    description:
      "Une plateforme d'instruction en famille fondée sur une vision éducative cohérente.",
    images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
