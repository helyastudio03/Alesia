import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { Breadcrumb } from '@/components/breadcrumb'
import { CURRICULUM, type Domain } from '@/lib/curriculum'
import { getChild, getAge, LEARNING_STYLE_LABELS } from '@/lib/children'
import { notFound } from 'next/navigation'

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

const CHIFFRES: Record<Domain, string> = {
  'Le Verbe': 'I',
  'Le Nombre & les Formes': 'II',
  'Le Monde': 'III',
  'Le Corps & la Main': 'IV',
}

// Modules suggérés : croisement niveau × domaines en travail, limités à 6.
function modulesForChild(gradeLevel: string, domains: Domain[]) {
  return CURRICULUM
    .filter(m => m.levels.includes(gradeLevel as never) && domains.includes(m.domain))
    .slice(0, 6)
}

export default async function EnfantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const child = getChild(id)
  if (!child) notFound()

  const age = getAge(child.birth_date)
  const suggested = modulesForChild(child.grade_level, child.domains)

  return (
    <div className="bg-cream min-h-screen">
      {/* HERO */}
      <section className="relative h-[38vh] min-h-[260px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80"
          alt="Enfant qui apprend"
          fill
          className="object-cover object-center grayscale"
          priority
        />
        <div className="absolute inset-0 bg-forest/82" />
        <div className="relative z-10 text-center px-6">
          <div
            className="w-14 h-14 bg-forest/40 border border-gold/40 flex items-center justify-center text-2xl text-cream font-light mx-auto mb-4"
            style={GARAMOND}
          >
            {child.first_name[0]}
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-cream" style={GARAMOND}>
            {child.first_name}
          </h1>
          <p className="text-cream/60 text-sm mt-2">{age} ans · {child.grade_level}</p>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">

          <AnimateOnScroll className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Mes enfants', href: '/enfants' },
                { label: child.first_name },
              ]}
            />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/15 mb-12">

            {/* Niveau */}
            <AnimateOnScroll className="bg-cream p-6">
              <p className="text-gold tracking-[0.2em] text-xs uppercase mb-3">Niveau</p>
              <p className="text-2xl font-light text-charcoal" style={GARAMOND}>{child.grade_level}</p>
            </AnimateOnScroll>

            {/* Style */}
            <AnimateOnScroll delay={60} className="bg-cream p-6">
              <p className="text-gold tracking-[0.2em] text-xs uppercase mb-3">Style d&apos;apprentissage</p>
              <p className="text-2xl font-light text-charcoal" style={GARAMOND}>
                {LEARNING_STYLE_LABELS[child.learning_style] ?? '—'}
              </p>
            </AnimateOnScroll>

            {/* Domaines */}
            <AnimateOnScroll delay={120} className="bg-cream p-6">
              <p className="text-gold tracking-[0.2em] text-xs uppercase mb-3">Domaines en travail</p>
              <div className="space-y-1">
                {child.domains.map(d => (
                  <p key={d} className="text-charcoal/70 text-sm flex items-center gap-2">
                    <span className="text-gold/60 text-xs">{CHIFFRES[d]}</span>
                    {d}
                  </p>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

          {/* Intérêts */}
          {child.interests.length > 0 && (
            <AnimateOnScroll delay={80} className="mb-10">
              <p className="text-gold tracking-[0.2em] text-xs uppercase mb-4">Centres d&apos;intérêt</p>
              <div className="flex flex-wrap gap-2">
                {child.interests.map(i => (
                  <span key={i} className="text-xs text-charcoal/60 border border-stone/30 px-3 py-1">
                    {i}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>
          )}

          {/* Notes */}
          {child.notes && (
            <AnimateOnScroll delay={100} className="mb-10 border-l-2 border-gold pl-5">
              <p className="text-gold tracking-[0.2em] text-xs uppercase mb-2">Notes</p>
              <p className="text-charcoal/65 text-sm leading-relaxed italic" style={GARAMOND}>
                {child.notes}
              </p>
            </AnimateOnScroll>
          )}

          {/* Modules suggérés */}
          {suggested.length > 0 && (
            <AnimateOnScroll delay={120}>
              <p className="text-gold tracking-[0.2em] text-xs uppercase mb-4">Prochaines leçons suggérées</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/15 mb-8">
                {suggested.map(m => (
                  <Link
                    key={m.id}
                    href={`/generateur?module=${m.id}&child=${child.id}`}
                    className="block bg-cream p-5 hover:bg-parchment transition-colors group"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <span className="text-lg font-light text-charcoal group-hover:text-forest transition-colors" style={GARAMOND}>
                        {m.title}
                      </span>
                      <span className="text-stone/50 text-[0.65rem] uppercase tracking-wider flex-shrink-0">
                        {m.subject}
                      </span>
                    </div>
                    <p className="text-charcoal/45 text-xs leading-snug mb-2">{m.topic}</p>
                    <span className="text-gold/0 group-hover:text-gold/60 text-xs transition-colors tracking-widest uppercase">
                      Composer →
                    </span>
                  </Link>
                ))}
              </div>
            </AnimateOnScroll>
          )}

          {/* Actions */}
          <AnimateOnScroll delay={150} className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-stone/20">
            <Link
              href={`/generateur?child=${child.id}`}
              className="flex-1 text-center py-4 bg-forest text-cream text-xs tracking-widest uppercase hover:bg-charcoal transition-colors"
            >
              Composer une leçon libre
            </Link>
            <Link
              href={`/enfants/${child.id}/edit`}
              className="flex-1 text-center py-4 border border-stone/40 text-charcoal/60 text-xs tracking-widest uppercase hover:border-charcoal hover:text-charcoal transition-all"
            >
              Modifier le profil
            </Link>
          </AnimateOnScroll>

        </div>
      </section>
    </div>
  )
}
