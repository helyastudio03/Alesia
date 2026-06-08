import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { Breadcrumb } from '@/components/breadcrumb'

export const metadata = {
  title: 'Mes leçons',
  description: 'Retrouvez toutes les leçons que vous avez composées avec Alesia, classées par domaine et par enfant.',
}

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

export default function LeconsPage() {
  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&q=80"
          alt="Bureau de travail"
          fill
          className="object-cover object-center grayscale"
          priority
        />
        <div className="absolute inset-0 bg-forest/82" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-6 font-light">Bibliothèque</p>
          <h1
            className="text-5xl md:text-6xl font-light text-cream mb-6"
            style={{ ...GARAMOND, letterSpacing: '-0.01em' }}
          >
            Vos leçons
          </h1>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>
      </section>

      {/* FIL D'ARIANE */}
      <div className="border-b border-stone/15 px-4 md:px-6">
        <div className="max-w-4xl mx-auto py-4">
          <Breadcrumb items={[{ label: 'Mes leçons' }]} />
        </div>
      </div>

      {/* CONTENU */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll className="flex items-center justify-between mb-12">
            <p className="text-charcoal/50 text-sm italic" style={GARAMOND}>
              Les leçons composées et sauvegardées apparaîtront ici.
            </p>
            <Link
              href="/generateur"
              className="px-6 py-3 border border-charcoal text-charcoal text-xs tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              Nouvelle leçon
            </Link>
          </AnimateOnScroll>

          {/* État vide */}
          <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center py-24 border border-dashed border-stone/30">
            <div className="text-5xl text-gold/25 mb-6" style={GARAMOND}>✦</div>
            <h3 className="text-xl font-light text-charcoal mb-3" style={GARAMOND}>
              Aucune leçon sauvegardée
            </h3>
            <p className="text-charcoal/45 text-sm text-center max-w-xs leading-relaxed mb-8">
              La sauvegarde des leçons sera disponible lorsque votre compte sera configuré.
              En attendant, utilisez les boutons Copier et Imprimer du générateur.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/generateur"
                className="px-8 py-3 border border-charcoal text-charcoal text-xs tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
              >
                Composer une leçon
              </Link>
              <Link
                href="/programme"
                className="px-8 py-3 text-charcoal/50 text-xs tracking-widest uppercase hover:text-charcoal border border-stone/30 hover:border-charcoal transition-all duration-300"
              >
                Voir le programme
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}
