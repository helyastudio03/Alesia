import Image from 'next/image'
import Link from 'next/link'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

export const metadata = {
  title: 'Questions fréquentes — Alesia',
  description:
    "Légalité, organisation, progression, rôle de l'outil — les questions que se posent les parents qui envisagent l'instruction en famille.",
}

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

const FAQ: { q: string; r: React.ReactNode }[] = [
  {
    q: "L'instruction en famille est-elle légale en France ?",
    r: "Oui. L'article L.131-2 du Code de l'éducation reconnaît l'instruction en famille (IEF) comme une alternative légale à la scolarisation. Depuis 2022, elle nécessite une autorisation préfectorale annuelle, accordée sur présentation d'un motif (convictions éducatives, mode de vie, situation particulière de l'enfant). Les familles sont soumises à un contrôle annuel par l'Éducation nationale ou les services sociaux, portant sur l'acquisition des connaissances de l'enfant.",
  },
  {
    q: 'Par où commencer ?',
    r: <>Commencez par définir le niveau réel de l&apos;enfant — pas son âge, pas sa classe hypothétique, mais ce qu&apos;il sait faire. Créez son profil, consultez le <Link href="/programme" className="text-forest underline underline-offset-2">programme</Link> pour voir les modules qui lui correspondent, et composez une première leçon dans le domaine qui l&apos;intéresse le plus. Ne cherchez pas à couvrir tout le programme dès la première semaine : une leçon maîtrisée vaut dix survolées.</>,
  },
  {
    q: 'Combien de temps faut-il consacrer à l\'instruction chaque jour ?',
    r: "Beaucoup moins que vous ne le pensez. Un enfant qui apprend sans la gestion collective d'une classe progresse en deux à trois heures de travail concentré ce qui lui prendrait une journée entière à l'école. La règle pratique : une heure par jour et par âge d'école primaire (deux heures en CM1/CM2, trois en collège). L'important est la régularité et la qualité de l'attention, pas la durée.",
  },
  {
    q: 'Faut-il suivre le programme officiel de l\'Éducation nationale ?',
    r: "Non. Vous n'avez pas à suivre les programmes officiels ni leur découpage par matières. Vous avez l'obligation de résultats — l'enfant doit acquérir les compétences fondamentales vérifiées lors du contrôle annuel — mais pas l'obligation de moyens. Alesia propose un curriculum structuré et cohérent, fondé sur une vision éducative assumée, différente de celle de l'institution scolaire.",
  },
  {
    q: 'Mes enfants ne vont-ils pas manquer de socialisation ?',
    r: "La socialisation ne se limite pas à la cour de récréation. Les enfants instruits en famille participent souvent à des activités sportives, musicales, artistiques ou scoutes, à des groupes IEF locaux, et à la vie familiale et communautaire au sens large. La question pertinente n'est pas « avec combien d'enfants » mais « dans quel type de relations » — et la qualité des relations compte plus que leur quantité.",
  },
  {
    q: 'Dois-je être professeur pour instruire mon enfant ?',
    r: "Non. Vous devez simplement avoir le désir de transmettre et la discipline de vous organiser. La plupart des matières du primaire et du collège sont à la portée d'un parent attentif et curieux. Pour les niveaux lycée et les matières techniques, il peut être utile de s'appuyer sur des ressources extérieures (tuteurs, groupes IEF, cours en ligne) pour les sujets qui dépassent votre maîtrise personnelle. La modestie est une vertu pédagogique.",
  },
  {
    q: 'Comment évaluer la progression de l\'enfant ?',
    r: "L'évaluation Alesia mesure la maîtrise réelle : l'enfant avance quand il sait, pas quand le calendrier l'y autorise. En pratique : posez des questions, demandez des explications orales, faites refaire un exercice sans aide. Si l'enfant ne peut pas refaire seul ce qu'il vient d'apprendre, la leçon n'est pas acquise — on reprend. Il n'y a pas d'échec dans ce système, seulement des étapes qui prennent plus ou moins de temps.",
  },
  {
    q: "Quel est le rôle de l'outil dans la transmission ?",
    r: "Alesia compose les leçons, structure le programme et personnalise les exemples. Il ne remplace pas le parent : c'est lui qui transmet, corrige, encourage et incarne le rapport au savoir. L'outil prend en charge la préparation — la part chronophage mais mécanique — pour que le parent soit pleinement disponible pour la relation pédagogique réelle.",
  },
  {
    q: 'L\'enfant peut-il passer un brevet ou un baccalauréat ?',
    r: "Oui. Les enfants instruits en famille peuvent passer tous les examens officiels en tant que candidats libres — CRPE, brevet, baccalauréat. Il est également possible de réintégrer le système scolaire à tout moment. L'IEF n'est pas une impasse : de nombreux enfants instruits en famille ont rejoint des classes préparatoires, des grandes écoles ou des universités sans difficulté particulière.",
  },
]

export default function FAQPage() {
  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1600&q=80"
          alt="Salle de lecture"
          fill
          className="object-cover object-center grayscale"
          priority
        />
        <div className="absolute inset-0 bg-forest/82" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-6 font-light">Questions fréquentes</p>
          <h1
            className="text-5xl md:text-6xl font-light text-cream mb-6"
            style={{ ...GARAMOND, letterSpacing: '-0.01em' }}
          >
            Ce que vous voulez savoir
          </h1>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto divide-y divide-stone/20">
          {FAQ.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 40} className="py-10">
              <h2
                className="text-xl md:text-2xl font-light text-charcoal mb-5 leading-snug"
                style={GARAMOND}
              >
                {item.q}
              </h2>
              <p className="text-charcoal/65 leading-relaxed">{item.r}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-parchment text-center">
        <AnimateOnScroll className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-6" style={GARAMOND}>
            Une question sans réponse ?
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="text-charcoal/60 leading-relaxed mb-10">
            Consultez la méthode pour comprendre la vision, ou commencez directement
            par le programme pour voir ce que l&apos;instruction concrète implique.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/methode"
              className="px-8 py-3 border border-charcoal text-charcoal text-xs tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              Lire la méthode
            </Link>
            <Link
              href="/programme"
              className="px-8 py-3 border border-stone/40 text-charcoal/60 text-xs tracking-widest uppercase hover:border-charcoal hover:text-charcoal transition-all duration-300"
            >
              Voir le programme
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </div>
  )
}
