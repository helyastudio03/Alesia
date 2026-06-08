import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { Breadcrumb } from '@/components/breadcrumb'
import { ExemplesGalerie } from './galerie'

export const metadata = {
  title: 'Exemples de leçons',
  description:
    "Quatre leçons d'exemple, une par domaine du curriculum Alesia : une fable latine, une démonstration d'Euclide, l'observation d'un chêne, la fabrication d'un tabouret. La méthode en pratique.",
  openGraph: {
    title: 'Exemples de leçons — Alesia',
    description: "Quatre leçons réelles, une par domaine. Ce que produit la méthode, sans retouche.",
    images: [{ url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80', width: 1200, height: 630 }],
  },
}

export default function ExemplesPage() {
  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80"
          alt="Bibliothèque ancienne"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-forest/80" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-6 font-light">Le résultat</p>
          <h1
            className="text-5xl md:text-6xl font-light text-cream mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.01em' }}
          >
            Quatre leçons, quatre domaines
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p
            className="text-cream/80 text-xl font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ce que produit la méthode, en pratique.
          </p>
        </div>
      </section>

      {/* FIL D'ARIANE */}
      <div className="border-b border-stone/15 px-4 md:px-6">
        <div className="max-w-5xl mx-auto py-4">
          <Breadcrumb items={[{ label: 'Exemples' }]} />
        </div>
      </div>

      {/* INTRODUCTION */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <AnimateOnScroll className="max-w-2xl mx-auto text-center">
          <p className="text-charcoal/70 leading-relaxed text-lg">
            Voici quatre leçons réelles, une par domaine du curriculum — rigoureuses, enracinées, et
            toujours reliées au geste ou à l&apos;observation directe. Chacune illustre ce que la méthode
            produit, sans retouche.
          </p>
        </AnimateOnScroll>
      </section>

      {/* GALERIE */}
      <ExemplesGalerie />

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-forest text-center">
        <AnimateOnScroll className="max-w-2xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light text-cream mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            À votre tour
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="text-cream/75 text-lg leading-relaxed mb-10">
            Décrivez l&apos;enfant, la matière et le sujet. Une leçon sur mesure se compose,
            fidèle à la méthode, en quelques secondes.
          </p>
          <Link
            href="/generateur"
            className="inline-block px-10 py-4 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 text-sm tracking-widest uppercase"
          >
            Générer ma leçon
          </Link>
        </AnimateOnScroll>
      </section>
    </div>
  )
}
