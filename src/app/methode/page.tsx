import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

export const metadata = {
  title: 'La Méthode — Alesia',
  description:
    "Le curriculum et la progression pédagogique d'Alesia : quatre domaines de formation, trois âges de maîtrise, une vision cohérente de l'éducation.",
}

const DOMAINES = [
  {
    chiffre: 'I',
    titre: 'Le Verbe',
    sous: 'Lire, parler, persuader',
    disciplines: ['Latin', 'Français', 'Grammaire & logique', 'Rhétorique', 'Littérature', 'Lecture des sources'],
    texte:
      "Le langage précède la pensée. On ne raisonne bien qu'avec des mots justes. Ce domaine forme l'expression, la lecture exigeante des textes originaux, et l'art de soutenir un raisonnement. Le latin n'est pas un ornement : c'est la grammaire de la civilisation européenne.",
  },
  {
    chiffre: 'II',
    titre: 'Le Nombre & les Formes',
    sous: 'Mesurer, démontrer, abstraire',
    disciplines: ['Arithmétique', 'Géométrie', 'Algèbre', 'Logique formelle', 'Physique', 'Astronomie'],
    texte:
      "La rigueur mathématique est l'école du raisonnement vrai. De la manipulation concrète des quantités jusqu'à la démonstration abstraite, l'enfant apprend que certaines vérités ne se négocient pas. La géométrie d'Euclide reste un sommet pédagogique inégalé.",
  },
  {
    chiffre: 'III',
    titre: 'Le Monde',
    sous: 'Observer, situer, comprendre',
    disciplines: ['Histoire', 'Géographie physique', 'Sciences naturelles', 'Biologie', 'Observation du vivant', 'Cartographie'],
    texte:
      "On n'aime que ce que l'on connaît. Ce domaine enracine l'enfant dans le temps long de l'histoire et dans l'espace concret de la nature. L'observation directe du vivant — herbiers, saisons, astres — précède toujours le manuel.",
  },
  {
    chiffre: 'IV',
    titre: 'Le Corps & la Main',
    sous: 'Agir, fabriquer, créer',
    disciplines: ['Éducation physique', 'Savoir-faire manuels', 'Dessin', 'Musique', 'Travail du bois', 'Jardinage'],
    texte:
      "Un esprit ne se forme pas hors d'un corps. Le sport forge le caractère, la main qui fabrique comprend ce que l'esprit seul ignore. Ce domaine n'est pas un loisir : c'est la moitié de l'homme complet, trop souvent abandonnée par l'école.",
  },
]

const AGES = [
  {
    num: '01',
    titre: 'L\'âge des faits',
    age: 'Fondations',
    texte:
      "L'enfant a une mémoire avide et un goût naturel pour le concret. On nourrit cette faim : récitation, observation, vocabulaire, faits historiques, tables, noms des plantes et des étoiles. On bâtit le socle sur lequel tout reposera.",
  },
  {
    num: '02',
    titre: 'Le raisonnement',
    age: 'Construction',
    texte:
      "Vient l'âge des « pourquoi ». L'enfant veut relier les causes aux effets, contester, démontrer. On lui donne la logique, l'argumentation, la méthode scientifique. On ne réprime pas l'esprit critique : on le discipline et on l'arme.",
  },
  {
    num: '03',
    titre: 'L\'expression',
    age: 'Maîtrise',
    texte:
      "L'élève devenu capable cherche à dire, à créer, à convaincre. On cultive la rhétorique, l'écriture personnelle, le jugement esthétique et moral. C'est l'âge de l'autonomie réelle : l'enfant peut désormais apprendre seul ce qu'il choisit.",
  },
]

export default function MethodePage() {
  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1600&q=80"
          alt="Manuscrit ancien"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-forest/80" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-6 font-light">Le curriculum</p>
          <h1
            className="text-5xl md:text-6xl font-light text-cream mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.01em' }}
          >
            La Méthode
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p
            className="text-cream/80 text-xl font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Quatre domaines. Trois âges. Une formation cohérente.
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-24 px-6">
        <AnimateOnScroll className="max-w-3xl mx-auto text-center">
          <p className="text-gold tracking-[0.25em] text-xs uppercase mb-6">Le principe</p>
          <h2
            className="text-3xl md:text-4xl font-light text-charcoal mb-8 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            On ne forme pas un programme.<br />
            <em>On forme un homme.</em>
          </h2>
          <p className="text-charcoal/70 leading-relaxed text-lg">
            Le système scolaire découpe le savoir en matières cloisonnées, distribuées par tranches d&apos;âge,
            sans souci de cohérence ni de maîtrise réelle. Alesia procède autrement. Notre curriculum repose
            sur une conviction ancienne : il existe un ordre naturel dans l&apos;apprentissage, et des savoirs
            qui méritent d&apos;être transmis pour eux-mêmes — non parce qu&apos;ils sont « utiles », mais parce
            qu&apos;ils forment l&apos;intelligence et le caractère.
          </p>
        </AnimateOnScroll>
      </section>

      {/* LES QUATRE DOMAINES */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-gold tracking-[0.25em] text-xs uppercase mb-4">Les quatre domaines</p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              La carte du savoir
            </h2>
          </AnimateOnScroll>
          <div className="space-y-px bg-stone/20">
            {DOMAINES.map((d, i) => (
              <AnimateOnScroll key={d.titre} delay={i * 80} className="bg-cream p-10 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-3">
                    <div
                      className="text-5xl text-gold/40 mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {d.chiffre}
                    </div>
                    <h3
                      className="text-3xl font-light text-charcoal"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {d.titre}
                    </h3>
                    <p className="text-stone text-sm italic mt-1">{d.sous}</p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-charcoal/70 leading-relaxed">{d.texte}</p>
                  </div>
                  <div className="md:col-span-3">
                    <ul className="space-y-1.5">
                      {d.disciplines.map((disc) => (
                        <li key={disc} className="text-charcoal/60 text-sm flex items-start gap-2">
                          <span className="text-gold mt-1">·</span>
                          {disc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll className="mt-12 text-center">
            <p className="text-stone text-sm italic max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Transversalement, la <span className="text-charcoal">Sagesse</span> — philosophie, éthique,
              formation du jugement — irrigue les quatre domaines. Elle n&apos;est pas une matière de plus :
              elle en est la fin.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* LES TROIS ÂGES */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-gold tracking-[0.25em] text-xs uppercase mb-4">La progression</p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Les trois âges
            </h2>
            <p className="text-charcoal/60 max-w-xl mx-auto leading-relaxed">
              La progression ne suit pas l&apos;année de naissance, mais la maturité réelle de l&apos;enfant.
              Ces trois âges, hérités de la pédagogie classique, se succèdent au rythme de chacun.
            </p>
          </AnimateOnScroll>
          <div className="space-y-0 divide-y divide-stone/20">
            {AGES.map((a, i) => (
              <AnimateOnScroll key={a.num} delay={i * 100} className="py-10 flex gap-8 items-start">
                <div
                  className="text-5xl text-gold/30 font-light flex-shrink-0 w-16"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {a.num}
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3
                      className="text-2xl font-light text-charcoal"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {a.titre}
                    </h3>
                    <span className="text-gold text-xs tracking-widest uppercase">{a.age}</span>
                  </div>
                  <p className="text-charcoal/60 leading-relaxed">{a.texte}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* LA MÉRITOCRATIE */}
      <section className="relative py-32 px-6 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1600&q=80"
          alt="Colonnade classique"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-charcoal/85" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-gold tracking-[0.25em] text-xs uppercase mb-6">Le principe de progression</p>
            <h2
              className="text-4xl md:text-5xl font-light text-cream mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              On avance quand <em>on sait</em>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <p className="text-cream/75 text-lg leading-relaxed mb-6">
              Pas de passage automatique. Pas de nivellement par le bas. Chaque étape n&apos;est franchie
              que lorsque la précédente est réellement maîtrisée. L&apos;enfant rapide n&apos;est pas retenu ;
              l&apos;enfant qui prend son temps n&apos;est pas humilié.
            </p>
            <p className="text-cream/75 text-lg leading-relaxed">
              L&apos;effort est reconnu, l&apos;excellence est nommée, la difficulté est affrontée plutôt
              que masquée. C&apos;est cela, la méritocratie : non pas la compétition pour la compétition,
              mais le respect dû à la maîtrise réelle.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* L'OUTIL AU SERVICE DE LA MÉTHODE */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-gold tracking-[0.25em] text-xs uppercase mb-4">L&apos;outil</p>
            <h2
              className="text-4xl font-light text-charcoal"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              L&apos;outil au service de la méthode,<br /><em>jamais l&apos;inverse</em>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={150} className="space-y-6 text-charcoal/70 leading-relaxed">
            <p>
              L&apos;outil ne définit pas notre pédagogie : il l&apos;applique.
              Chaque leçon s&apos;inscrit dans ce curriculum, respecte l&apos;ordre des trois âges,
              et adapte le contenu au tempérament de l&apos;enfant — sans jamais diluer l&apos;exigence.
            </p>
            <p>
              Il personnalise les exemples, le rythme et les centres d&apos;intérêt. Il ne touche
              ni aux fondations, ni aux jalons de maîtrise. La cohérence d&apos;ensemble est garantie par
              la méthode ; la personnalisation, par l&apos;outil. Le parent, lui, reste le maître.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-forest text-center">
        <AnimateOnScroll className="max-w-2xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light text-cream mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Mettre la méthode<br /><em>en pratique</em>
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/enfants/nouveau"
              className="inline-block px-10 py-4 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 text-sm tracking-widest uppercase"
            >
              Créer un profil
            </Link>
            <Link
              href="/generateur"
              className="inline-block px-10 py-4 text-cream/70 hover:text-cream border border-cream/20 hover:border-cream/50 transition-all duration-300 text-sm tracking-widest uppercase"
            >
              Générer une leçon
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </div>
  )
}
