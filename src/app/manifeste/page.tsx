import Image from 'next/image'
import Link from 'next/link'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { Breadcrumb } from '@/components/breadcrumb'

export const metadata = {
  title: 'Le Manifeste',
  description:
    "Pourquoi Alesia existe : un constat sur l'effondrement de la transmission, un refus de la pédagogie molle, et une vision assumée de ce que former un enfant signifie.",
  openGraph: {
    title: 'Le Manifeste — Alesia',
    description: "L'école normalise. Nous transmettons. Ce que nous croyons, sans détour.",
    images: [{ url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&q=80', width: 1200, height: 630 }],
  },
}

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

const THESES = [
  {
    num: 'I',
    titre: "L'école ne forme plus",
    texte: "Ce n'est pas une provocation — c'est un constat que des milliers de parents font chaque année en retirant leurs enfants du système. L'école de la République a longtemps su transmettre un socle commun, parfois même l'excellence. Elle a progressivement renoncé à cette ambition pour en embrasser une autre : l'inclusion totale, le confort de tous, le nivellement assumé. Ce changement a un nom dans les textes officiels — « bienveillance » — et une conséquence mesurable : des enfants qui sortent de seize années de scolarité sans savoir lire un texte difficile, sans avoir jamais mémorisé quoi que ce soit, sans la moindre familiarité avec la pensée qui a construit la civilisation dont ils sont les héritiers. Ce n'est pas le résultat d'une incompétence. C'est le résultat d'un choix.",
  },
  {
    num: 'II',
    titre: 'La pédagogie molle est une forme de mépris',
    texte: "On a présenté comme une révolution humaniste ce qui n'était qu'un abaissement des exigences. Supprimer la mémorisation parce qu'elle est « contraignante ». Supprimer la notation parce qu'elle est « anxiogène ». Supprimer les classiques parce qu'ils sont « élitistes ». Derrière ces décisions, une hypothèse implicite et profondément condescendante : l'enfant ne peut pas, l'enfant ne doit pas être mis en difficulté, l'enfant doit être protégé de l'effort. C'est l'inverse de la vérité. L'enfant est capable de beaucoup plus qu'on ne lui demande. Il est avide de comprendre, de mémoriser, de maîtriser. Ce qui l'abîme, ce n'est pas l'exigence — c'est l'ennui, la médiocrité tolérée, le sentiment que ce qu'on lui enseigne ne vaut pas la peine d'être appris.",
  },
  {
    num: 'III',
    titre: 'Transmettre est un acte politique',
    texte: "Choisir ce qu'on enseigne à un enfant, c'est choisir ce qu'il sera. Ce n'est pas neutre. Il n'y a pas de pédagogie sans vision du monde, pas de curriculum sans hiérarchie des savoirs, pas de transmission sans jugement sur ce qui mérite d'être transmis. L'école prétend à la neutralité — c'est sa première imposture. Ses choix sont partout : dans les auteurs qu'elle omet, dans les périodes qu'elle survole, dans les exercices qu'elle privilégie, dans les vertus qu'elle ne nomme plus. Alesia assume ses choix. Nous pensons que certains savoirs méritent plus que d'autres d'être transmis. Que la tradition intellectuelle européenne est un héritage, pas un fardeau. Que le latin, Euclide, Virgile, l'histoire longue ne sont pas des ornements bourgeois : ce sont les outils avec lesquels des générations d'hommes ont appris à penser.",
  },
  {
    num: 'IV',
    titre: "L'enracinement avant l'ouverture",
    texte: "On confond souvent l'ouverture d'esprit avec l'absence de racines. C'est une erreur. On ne s'ouvre vraiment au monde que depuis un sol ferme. L'enfant qui ne sait pas d'où il vient, qui n'a pas été nourri des récits, des langues et des formes de sa civilisation, n'est pas plus libre — il est plus vulnérable. Il n'a pas de boussole. Nous ne formons pas des nationalistes fermés au monde. Nous formons des individus qui connaissent leur héritage assez bien pour l'interroger, le prolonger, ou le remettre en cause — mais depuis l'intérieur, avec les outils qu'il a forgés, pas depuis l'ignorance.",
  },
  {
    num: 'V',
    titre: "Le parent est le premier maître",
    texte: "Il n'y a pas de meilleur pédagogue qu'un parent attentif et cultivé, qui connaît son enfant, qui enseigne avec l'amour de la matière et le désir de transmettre. La salle de classe de trente élèves est une contrainte logistique, pas un idéal pédagogique. L'histoire de l'excellence intellectuelle est largement une histoire d'éducation familiale, privée, de préceptorat. Montaigne, Pascal, Newton, Mill, Wittgenstein — éduqués en dehors ou en marge du système de leur époque. Ce n'est pas un hasard. L'enseignement est une relation entre deux personnes : celui qui sait et celui qui apprend. Tout le reste est administration.",
  },
  {
    num: 'VI',
    titre: "Alesia n'est pas une solution — c'est un parti pris",
    texte: "Nous n'avons pas construit Alesia pour répondre à tous les parents, ni pour plaire à l'institution. Nous l'avons construit pour les familles qui ont fait un choix difficile et assumé : reprendre en main la formation de leurs enfants, sans déléguer ce qui leur importe le plus à un système dans lequel ils n'ont plus confiance. L'outil est au service d'une vision. Il aide à composer des leçons rigoureuses, cohérentes, adaptées — mais la vision qui guide chaque leçon est la nôtre, clairement posée, sans euphémisme. Si vous la partagez, Alesia est fait pour vous. Si vous cherchez la neutralité, vous trouverez ailleurs de meilleures réponses.",
  },
]

export default function ManifestePage() {
  return (
    <div className="bg-cream">

      {/* HERO */}
      <section className="relative h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1600&q=80"
          alt="Ruines romaines au crépuscule"
          fill
          className="object-cover object-center grayscale"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-6 font-light">Ce que nous croyons</p>
          <h1
            className="text-5xl md:text-7xl font-light text-cream mb-6"
            style={{ ...GARAMOND, letterSpacing: '-0.01em' }}
          >
            Le Manifeste
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-cream/75 text-xl font-light italic" style={GARAMOND}>
            L&apos;école normalise. Nous transmettons.
          </p>
        </div>
      </section>

      {/* FIL D'ARIANE */}
      <div className="border-b border-stone/15 px-4 md:px-6">
        <div className="max-w-3xl mx-auto py-4">
          <Breadcrumb items={[{ label: 'Le Manifeste' }]} />
        </div>
      </div>

      {/* ÉPIGRAPHE */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-parchment">
        <AnimateOnScroll className="max-w-2xl mx-auto text-center">
          <p
            className="text-2xl md:text-3xl font-light text-charcoal/80 italic leading-relaxed"
            style={GARAMOND}
          >
            &laquo;&nbsp;Une génération qui ne reçoit rien ne peut rien donner.&nbsp;&raquo;
          </p>
          <div className="w-8 h-px bg-gold mx-auto mt-8" />
        </AnimateOnScroll>
      </section>

      {/* LES SIX THÈSES */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {THESES.map((t, i) => (
            <AnimateOnScroll
              key={t.num}
              delay={i * 60}
              className="py-14 border-b border-stone/15 last:border-b-0"
            >
              <div className="flex items-baseline gap-5 mb-5">
                <span
                  className="text-4xl text-gold/35 flex-shrink-0"
                  style={GARAMOND}
                >
                  {t.num}
                </span>
                <h2
                  className="text-2xl md:text-3xl font-light text-charcoal"
                  style={GARAMOND}
                >
                  {t.titre}
                </h2>
              </div>
              <p
                className="text-charcoal/70 leading-[1.9] text-lg pl-12"
                style={GARAMOND}
              >
                {t.texte}
              </p>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* DÉCLARATION FINALE */}
      <section className="relative py-32 px-6 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1600&q=80"
          alt="Colonnade classique"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-forest/90" />
        <AnimateOnScroll className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-8">Notre engagement</p>
          <p
            className="text-cream text-2xl md:text-3xl font-light italic leading-relaxed mb-8"
            style={GARAMOND}
          >
            Nous ne promettons pas la facilité.<br />
            Nous promettons que ce qui sera appris<br />
            <em>sera vraiment su.</em>
          </p>
          <div className="w-12 h-px bg-gold mx-auto" />
        </AnimateOnScroll>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-parchment text-center">
        <AnimateOnScroll className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-6" style={GARAMOND}>
            Vous partagez cette vision ?
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="text-charcoal/60 leading-relaxed mb-10">
            Commencez par la méthode pour comprendre le curriculum,
            ou composez directement une première leçon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/methode"
              className="px-8 py-3 bg-forest text-cream text-xs tracking-widest uppercase hover:bg-charcoal transition-colors"
            >
              Lire la méthode
            </Link>
            <Link
              href="/generateur"
              className="px-8 py-3 border border-stone/40 text-charcoal/60 text-xs tracking-widest uppercase hover:border-charcoal hover:text-charcoal transition-all"
            >
              Composer une leçon
            </Link>
          </div>
        </AnimateOnScroll>
      </section>

    </div>
  )
}
