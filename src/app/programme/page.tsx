import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { CURRICULUM, DOMAINS, AGES, type Domain, type Age, type Module } from '@/lib/curriculum'

export const metadata = {
  title: 'Le Programme — Alesia',
  description:
    "Le tronc commun d'Alesia : l'ensemble des modules de formation, classés par domaine et par âge de progression.",
}

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

const CHIFFRES: Record<Domain, string> = {
  'Le Verbe': 'I',
  'Le Nombre & les Formes': 'II',
  'Le Monde': 'III',
  'Le Corps & la Main': 'IV',
}

function modulesByDomainAndAge(domain: Domain): Record<Age, Module[]> {
  const result = { "L'âge des faits": [], 'Le raisonnement': [], "L'expression": [] } as Record<Age, Module[]>
  for (const m of CURRICULUM) {
    if (m.domain === domain) result[m.age].push(m)
  }
  return result
}

export default function ProgrammePage() {
  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=1600&q=80"
          alt="Livres anciens reliés"
          fill
          className="object-cover object-center grayscale"
          priority
        />
        <div className="absolute inset-0 bg-forest/82" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-6 font-light">Le tronc commun</p>
          <h1
            className="text-5xl md:text-6xl font-light text-cream mb-6"
            style={{ ...GARAMOND, letterSpacing: '-0.01em' }}
          >
            Le Programme
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-cream/75 text-lg font-light italic" style={GARAMOND}>
            Un parcours ordonné, du premier mot à la pensée libre.
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <AnimateOnScroll className="max-w-2xl mx-auto text-center">
          <p className="text-charcoal/70 leading-relaxed text-lg">
            Voici l&apos;ensemble du tronc commun, classé par domaine puis par âge de progression.
            Ce n&apos;est pas une liste de cases à cocher, mais une carte : un ordre naturel de
            l&apos;apprentissage, que chaque enfant parcourt à son rythme propre. Le cours personnalisé
            vient ensuite, en complément, jamais à la place.
          </p>
        </AnimateOnScroll>
      </section>

      {/* DOMAINES */}
      {DOMAINS.map((domain, di) => {
        const byAge = modulesByDomainAndAge(domain)
        return (
          <section
            key={domain}
            className={`py-12 md:py-20 px-4 md:px-6 ${di % 2 === 1 ? 'bg-parchment' : ''}`}
          >
            <div className="max-w-5xl mx-auto">
              <AnimateOnScroll className="flex items-baseline gap-5 mb-12">
                <span className="text-5xl text-gold/40" style={GARAMOND}>{CHIFFRES[domain]}</span>
                <h2 className="text-3xl md:text-4xl font-light text-charcoal" style={GARAMOND}>
                  {domain}
                </h2>
              </AnimateOnScroll>

              <div className="space-y-10">
                {AGES.map(age => {
                  const mods = byAge[age]
                  if (mods.length === 0) return null
                  return (
                    <AnimateOnScroll key={age}>
                      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-4">{age}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/15">
                        {mods.map(m => (
                          <Link
                            key={m.id}
                            href={`/generateur?module=${m.id}`}
                            className="block bg-cream p-4 md:p-5 hover:bg-parchment transition-colors group"
                          >
                            <div className="flex items-baseline justify-between gap-3 mb-1">
                              <h3 className="text-xl font-light text-charcoal group-hover:text-forest transition-colors" style={GARAMOND}>
                                {m.title}
                              </h3>
                              <span className="text-stone/60 text-[0.65rem] uppercase tracking-wider flex-shrink-0">
                                {m.subject}
                              </span>
                            </div>
                            <p className="text-charcoal/55 text-sm leading-snug mb-3">{m.topic}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-stone/50 text-[0.7rem] tracking-wide">
                                {m.levels[0]} – {m.levels[m.levels.length - 1]}
                              </p>
                              <span className="text-gold/0 group-hover:text-gold/60 text-xs transition-colors tracking-widest uppercase">
                                Composer →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </AnimateOnScroll>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="py-24 px-6 bg-forest text-center">
        <AnimateOnScroll className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-cream mb-6" style={GARAMOND}>
            Suivre le programme
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="text-cream/75 text-lg leading-relaxed mb-10">
            Choisissez le niveau de l&apos;enfant et composez la prochaine leçon de son parcours,
            fidèle à la méthode.
          </p>
          <Link
            href="/generateur"
            className="inline-block px-10 py-4 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 text-sm tracking-widest uppercase"
          >
            Composer une leçon
          </Link>
        </AnimateOnScroll>
      </section>
    </div>
  )
}
