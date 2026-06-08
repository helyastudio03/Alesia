import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

export const metadata = {
  title: 'Alesia — Instruction en Famille',
  description:
    "Alesia est une plateforme d'instruction en famille fondée sur une vision éducative assumée : former des individus complets, transmettre des savoirs enracinés, progresser par la maîtrise réelle.",
  openGraph: {
    title: 'Alesia — Instruction en Famille',
    description: "Former des individus complets. Transmettre ce qui dure. Une alternative réelle à l'école institutionnelle.",
    images: [{ url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80', width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return (
    <div className="bg-cream">

      {/* HERO — full bleed with overlay */}
      <section className="relative h-[92vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80"
          alt="Bibliothèque classique"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-6 font-light">
            Instruction en Famille
          </p>
          <h1 className="text-6xl md:text-8xl text-cream mb-6" style={{fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, letterSpacing: '0.08em'}}>
            Alesia
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-cream/80 text-xl md:text-2xl font-light italic mb-10" style={{fontFamily: "'Cormorant Garamond', serif"}}>
            Former des individus complets. Transmettre ce qui dure.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/enfants/nouveau"
              className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 text-sm tracking-widest uppercase"
            >
              Commencer
            </Link>
            <Link
              href="#philosophie"
              className="px-8 py-3 text-cream/70 hover:text-cream text-sm tracking-widest uppercase transition-colors border border-cream/20 hover:border-cream/50"
            >
              En savoir plus
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40">
          <span className="text-xs tracking-widest uppercase">Défiler</span>
          <div className="w-px h-8 bg-cream/30" />
        </div>
      </section>

      {/* EPIGRAPHE */}
      <section className="py-20 px-6 bg-parchment">
        <AnimateOnScroll className="max-w-2xl mx-auto text-center">
          <div className="w-8 h-px bg-stone mx-auto mb-8" />
          <blockquote className="text-2xl md:text-3xl italic text-charcoal/80 leading-relaxed mb-6" style={{fontFamily: "'Cormorant Garamond', serif"}}>
            « Il faut former un homme, et non un écolier. »
          </blockquote>
          <cite className="text-stone text-sm tracking-widest uppercase not-italic">— Montaigne, Essais, I, 26</cite>
          <div className="w-8 h-px bg-stone mx-auto mt-8" />
        </AnimateOnScroll>
      </section>

      {/* PHILOSOPHIE */}
      <section id="philosophie" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80"
                alt="Livres anciens"
                width={600}
                height={700}
                className="object-cover w-full grayscale contrast-110"
                style={{height: '500px'}}
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold -z-10" />
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200} className="space-y-10">
            <div>
              <p className="text-gold tracking-[0.25em] text-xs uppercase mb-4">Notre philosophie</p>
              <h2 className="text-4xl md:text-5xl font-light text-charcoal mb-6" style={{fontFamily: "'Cormorant Garamond', serif"}}>
                Une éducation<br /><em>enracinée</em>
              </h2>
              <p className="text-charcoal/70 leading-relaxed">
                L&apos;instruction en famille n&apos;est pas un repli — c&apos;est un choix de civilisation. Celui de former des individus complets : corps et esprit, raisonnement et savoir-faire, autonomie et enracinement. Pas des élèves conformes. Des êtres capables.
              </p>
            </div>
            <div className="border-l-2 border-gold pl-6">
              <h3 className="text-2xl font-light text-charcoal mb-3" style={{fontFamily: "'Cormorant Garamond', serif"}}>Savoirs enracinés, pratiques vivants</h3>
              <p className="text-charcoal/70 leading-relaxed">
                Mathématiques, philosophie, latin, sciences naturelles, savoir-faire manuels, éducation physique — des disciplines choisies pour leur densité réelle, non pour leur utilité immédiate. La progression suit le mérite, pas le calendrier.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CE QUE NOUS OFFRONS */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-gold tracking-[0.25em] text-xs uppercase mb-4">Notre offre</p>
            <h2 className="text-4xl md:text-5xl font-light text-charcoal" style={{fontFamily: "'Cormorant Garamond', serif"}}>
              Des outils à la hauteur<br /><em>de votre ambition</em>
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: 'I',
                title: 'Formation complète',
                desc: "Mathématiques, philosophie, langues anciennes, sciences naturelles, arts, sport, savoir-faire manuels — un curriculum qui forme l'individu entier, pas seulement l'élève.",
              },
              {
                num: 'II',
                title: 'Progression par le mérite',
                desc: "La progression suit la maîtrise réelle, non l'âge ni le calendrier scolaire. Chaque étape est franchie quand elle est acquise — ni plus tôt, ni plus tard.",
              },
              {
                num: 'III',
                title: 'Autonomie véritable',
                desc: "L'objectif n'est pas un enfant qui obéit, mais un enfant qui comprend. Chaque leçon vise à développer le jugement, l'initiative et la capacité à apprendre seul.",
              },
            ].map((item, i) => (
              <AnimateOnScroll key={item.num} delay={i * 150} className="bg-cream border-t-2 border-gold p-8">
                <div className="text-4xl text-gold/40 mb-4" style={{fontFamily: "'Cormorant Garamond', serif"}}>{item.num}</div>
                <h3 className="text-xl font-light text-charcoal mb-3" style={{fontFamily: "'Cormorant Garamond', serif"}}>{item.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* À PROPOS — dark section with photo */}
      <section className="relative py-32 px-6 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80"
          alt="Grande bibliothèque"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-forest/85" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-gold tracking-[0.25em] text-xs uppercase mb-6">Qui sommes-nous</p>
            <h2 className="text-4xl md:text-5xl font-light text-cream mb-8" style={{fontFamily: "'Cormorant Garamond', serif"}}>
              Construits par des parents,<br /><em>pour des parents</em>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <p className="text-cream/75 text-lg leading-relaxed mb-6">
              Alesia est né d&apos;un constat simple : l&apos;école institutionnelle ne forme plus, elle normalise. Face à cette dérive, nous avons choisi de reprendre en main ce qui nous appartient — la formation de nos enfants.
            </p>
            <p className="text-cream/75 text-lg leading-relaxed mb-6">
              Notre vision est celle d&apos;une éducation exigeante et cohérente : former des individus complets, capables de penser par eux-mêmes, ancrés dans une tradition vivante, aptes à agir dans le monde réel.
            </p>
            <p className="text-cream/75 text-lg leading-relaxed">
              Alesia n&apos;est pas un simple générateur de fiches. C&apos;est un outil construit sur une vision éducative assumée, qui personnalise chaque parcours sans jamais trahir la cohérence d&apos;ensemble.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* METHODE */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-gold tracking-[0.25em] text-xs uppercase mb-4">La méthode</p>
            <h2 className="text-4xl md:text-5xl font-light text-charcoal" style={{fontFamily: "'Cormorant Garamond', serif"}}>
              Trois étapes vers<br /><em>la leçon parfaite</em>
            </h2>
          </AnimateOnScroll>
          <div className="space-y-0 divide-y divide-stone/20">
            {[
              { num: '01', title: "Connaître l'enfant", desc: "Renseignez son tempérament, son niveau, ses forces et ses intérêts. Le contenu et les exemples s'adaptent à sa nature propre — jamais l'inverse." },
              { num: '02', title: 'Choisir la discipline', desc: 'Sélectionnez la matière, le thème, la durée. Précisez si vous travaillez le corps aussi bien que l\'esprit — sport, artisanat, nature sont des disciplines à part entière.' },
              { num: '03', title: 'Recevoir le plan', desc: 'Un plan complet et cohérent : objectifs clairs, contenu structuré, activités pratiques, évaluation par la maîtrise. Sauvegardez, ajustez, progressez.' },
            ].map((step, i) => (
              <AnimateOnScroll key={step.num} delay={i * 100} className="py-8 flex gap-8 items-start">
                <div className="text-5xl text-gold/30 font-light flex-shrink-0 w-16" style={{fontFamily: "'Cormorant Garamond', serif"}}>{step.num}</div>
                <div>
                  <h3 className="text-2xl font-light text-charcoal mb-2" style={{fontFamily: "'Cormorant Garamond', serif"}}>{step.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed">{step.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* VISION — 4 piliers */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-gold tracking-[0.25em] text-xs uppercase mb-4">Notre vision</p>
            <h2 className="text-4xl md:text-5xl font-light text-cream" style={{fontFamily: "'Cormorant Garamond', serif"}}>
              Quatre principes.<br /><em>Une formation.</em>
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/20">
            {[
              {
                title: 'L\'individu complet',
                desc: "Corps et esprit ne s'opposent pas — ils se complètent. Sport, arts manuels, nature et connaissance théorique forment ensemble un être capable d'agir dans le monde, pas seulement d'y réfléchir.",
                icon: '◈',
              },
              {
                title: 'Savoirs enracinés',
                desc: "Mathématiques, philosophie, latin, histoire naturelle, géographie physique — des disciplines choisies pour leur densité réelle et leur ancrage dans la tradition intellectuelle européenne.",
                icon: '◈',
              },
              {
                title: 'L\'autonomie réelle',
                desc: "Le but n'est pas un enfant qui obéit aux consignes, mais un enfant qui comprend le pourquoi. Chaque leçon vise à développer le jugement propre, l'initiative et la capacité à apprendre sans assistance.",
                icon: '◈',
              },
              {
                title: 'La méritocratie',
                desc: "La progression suit la maîtrise, non le calendrier. On avance quand on sait — ni plus tôt par faveur, ni plus tard par convention. L'effort et l'excellence sont reconnus sans complaisance.",
                icon: '◈',
              },
            ].map((pilier, i) => (
              <AnimateOnScroll key={pilier.title} delay={i * 100} className="bg-charcoal p-10">
                <div className="text-gold/40 text-2xl mb-4">{pilier.icon}</div>
                <h3 className="text-2xl font-light text-cream mb-4" style={{fontFamily: "'Cormorant Garamond', serif"}}>{pilier.title}</h3>
                <p className="text-cream/50 leading-relaxed text-sm">{pilier.desc}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-gold tracking-[0.25em] text-xs uppercase mb-4">Témoignages</p>
            <h2 className="text-4xl font-light text-charcoal" style={{fontFamily: "'Cormorant Garamond', serif"}}>
              Ils ont choisi <em>Alesia</em>
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { quote: "Pour la première fois, j'ai un outil qui partage vraiment ma vision de l'éducation. Pas de compromis, pas de pédagogie molle — de l'exigence.", author: "Marie", role: "Mère de trois enfants, Lyon" },
              { quote: "Mes fils progressent à leur rythme réel, pas au rythme du groupe. La différence est visible en quelques semaines.", author: "Jean-François", role: "Père, Bordeaux" },
            ].map((t, i) => (
              <AnimateOnScroll key={i} delay={i * 150} className="bg-cream p-8 border-l-2 border-gold">
                <blockquote className="text-xl italic text-charcoal/80 leading-relaxed mb-6" style={{fontFamily: "'Cormorant Garamond', serif"}}>
                  « {t.quote} »
                </blockquote>
                <div>
                  <p className="font-medium text-charcoal text-sm">{t.author}</p>
                  <p className="text-stone text-sm">{t.role}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 bg-forest text-center">
        <AnimateOnScroll className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-cream mb-6" style={{fontFamily: "'Cormorant Garamond', serif"}}>
            Prêt à commencer<br /><em>la transmission ?</em>
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <Link
            href="/enfants/nouveau"
            className="inline-block px-10 py-4 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 text-sm tracking-widest uppercase"
          >
            Créer le premier profil
          </Link>
        </AnimateOnScroll>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div>
              <p className="text-2xl text-cream mb-1" style={{fontFamily: "'Cormorant Garamond', serif"}}>Alesia <span className="text-stone text-lg">· IEF</span></p>
              <p className="text-stone text-sm italic" style={{fontFamily: "'Cormorant Garamond', serif"}}>L&apos;héritage se transmet, il ne s&apos;improvise pas.</p>
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-2">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/methode', label: 'Méthode' },
                { href: '/programme', label: 'Programme' },
                { href: '/exemples', label: 'Exemples' },
                { href: '/faq', label: 'FAQ' },
                { href: '/enfants', label: 'Enfants' },
                { href: '/lecons', label: 'Leçons' },
                { href: '/generateur', label: 'Générateur' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-stone hover:text-cream text-sm tracking-wider uppercase transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t border-stone/20 pt-8 text-center">
            <p className="text-stone/50 text-xs tracking-wider uppercase">
              © {new Date().getFullYear()} Alesia — Tous droits réservés
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
