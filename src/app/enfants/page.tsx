import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { MOCK_CHILDREN, getAge, LEARNING_STYLE_LABELS } from '@/lib/children'

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

const mockChildren = MOCK_CHILDREN

export default function EnfantsPage() {
  const hasChildren = mockChildren.length > 0

  return (
    <div className="bg-cream min-h-screen">
      {/* HERO */}
      <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80"
          alt="Enfants qui apprennent"
          fill
          className="object-cover object-center grayscale"
          priority
        />
        <div className="absolute inset-0 bg-forest/82" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-4 font-light">Les profils</p>
          <h1
            className="text-5xl font-light text-cream"
            style={{ ...GARAMOND, letterSpacing: '-0.01em' }}
          >
            Mes enfants
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">

          <AnimateOnScroll className="flex items-center justify-between mb-12">
            <p className="text-charcoal/50 text-sm italic" style={GARAMOND}>
              {hasChildren ? `${mockChildren.length} profil${mockChildren.length > 1 ? 's' : ''}` : 'Aucun profil'}
            </p>
            <Link
              href="/enfants/nouveau"
              className="px-6 py-3 border border-charcoal text-charcoal text-xs tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              + Nouveau profil
            </Link>
          </AnimateOnScroll>

          {!hasChildren ? (
            <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center py-24 border border-dashed border-stone/30">
              <div className="text-5xl text-gold/25 mb-6" style={GARAMOND}>✦</div>
              <h3 className="text-xl font-light text-charcoal mb-3" style={GARAMOND}>
                Aucun profil créé
              </h3>
              <p className="text-charcoal/45 text-sm text-center max-w-xs leading-relaxed mb-8">
                Le profil de l&apos;enfant personnalise les leçons composées. Commencez par en créer un.
              </p>
              <Link
                href="/enfants/nouveau"
                className="px-8 py-3 border border-charcoal text-charcoal text-xs tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
              >
                Créer un profil
              </Link>
            </AnimateOnScroll>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/20">
              {mockChildren.map((child, i) => (
                <AnimateOnScroll key={child.id} delay={i * 80} className="bg-cream p-8">
                  <div className="flex items-center gap-5 mb-6">
                    <div
                      className="w-12 h-12 bg-parchment border border-stone/30 flex items-center justify-center flex-shrink-0 text-xl font-light text-charcoal"
                      style={GARAMOND}
                    >
                      {child.first_name[0]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-light text-charcoal" style={GARAMOND}>
                        {child.first_name}
                      </h2>
                      <p className="text-stone text-xs mt-0.5">
                        {getAge(child.birth_date)} ans · {child.grade_level}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {child.learning_style && (
                      <div>
                        <p className="text-gold tracking-[0.15em] text-[0.65rem] uppercase mb-1.5">Style</p>
                        <span className="text-charcoal/60 text-xs border border-stone/25 px-2 py-0.5">
                          {LEARNING_STYLE_LABELS[child.learning_style] ?? child.learning_style}
                        </span>
                      </div>
                    )}
                    {child.interests.length > 0 && (
                      <div>
                        <p className="text-gold tracking-[0.15em] text-[0.65rem] uppercase mb-1.5">Intérêts</p>
                        <div className="flex flex-wrap gap-1.5">
                          {child.interests.map(interest => (
                            <span key={interest} className="text-charcoal/55 text-xs border border-stone/25 px-2 py-0.5">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-stone/15">
                    <Link
                      href={`/enfants/${child.id}`}
                      className="flex-1 text-center py-2.5 border border-stone/35 text-charcoal/60 text-xs tracking-widest uppercase hover:border-charcoal hover:text-charcoal transition-all"
                    >
                      Profil
                    </Link>
                    <Link
                      href={`/generateur?child=${child.id}`}
                      className="flex-1 text-center py-2.5 bg-forest text-cream text-xs tracking-widest uppercase hover:bg-charcoal transition-colors"
                    >
                      Composer
                    </Link>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
