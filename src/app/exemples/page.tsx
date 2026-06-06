import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { ExemplesGalerie } from './galerie'

export const metadata = {
  title: 'Exemples de leçons — Alesia',
  description:
    "Quatre leçons d'exemple, une par domaine du curriculum Alesia, pour découvrir la densité et la cohérence des leçons générées.",
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

      {/* INTRODUCTION */}
      <section className="py-20 px-6">
        <AnimateOnScroll className="max-w-2xl mx-auto text-center">
          <p className="text-charcoal/70 leading-relaxed text-lg">
            Voici quatre leçons réelles, une par domaine du curriculum. Chacune est née du même moteur
            pédagogique que vous utiliserez — rigoureuse, enracinée, et toujours reliée au geste ou à
            l&apos;observation directe. Aucune n&apos;a été retouchée à la main.
          </p>
        </AnimateOnScroll>
      </section>

      {/* GALERIE */}
      <ExemplesGalerie />

      {/* CTA */}
      <section className="py-24 px-6 bg-forest text-center">
        <AnimateOnScroll className="max-w-2xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light text-cream mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            À votre tour
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="text-cream/75 text-lg leading-relaxed mb-10">
            Décrivez l&apos;enfant, la matière et le sujet. Le moteur compose une leçon sur mesure,
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
