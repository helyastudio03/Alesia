'use client'

import { useState } from 'react'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

type Exemple = {
  chiffre: string
  domain: string
  age: string
  level: string
  title: string
  objectives: string[]
  introduction: string
  content: string
  activities: string[]
  materials: string[]
  assessment: string
}

const EXEMPLES: Exemple[] = [
  {
    chiffre: 'I',
    domain: 'Le Verbe',
    age: "L'âge des faits",
    level: 'CE2',
    title: 'La fable de Phèdre : « Le Loup et l\'Agneau »',
    objectives: [
      'Mémoriser et réciter une fable courte avec une diction juste',
      'Identifier la structure d\'un récit : situation, conflit, dénouement',
      'Reconnaître la morale et la formuler avec ses propres mots',
    ],
    introduction:
      "Avant La Fontaine, il y eut Phèdre, et avant Phèdre, Ésope. La même histoire traverse les siècles parce qu'elle dit quelque chose de vrai sur la force et la justice. Nous commençons par la version la plus ancienne et la plus dépouillée : c'est dans la simplicité que l'enfant saisit le mieux l'os du récit.",
    content:
      "On lit d'abord la fable à voix haute, lentement, deux fois. Puis on la relit phrase par phrase en s'assurant que chaque mot est compris : « ruisseau », « en amont », « troubler l'eau ». On dégage les deux personnages et ce que chacun veut. Le loup cherche un prétexte ; l'agneau répond par la raison. Mais la raison ne suffit pas face à la force décidée à nuire. On nomme cette vérité sans la commenter à l'excès : l'enfant doit la rencontrer, pas la disséquer. La récitation vient ensuite, par groupes de deux phrases, jusqu'à la fable entière.",
    activities: [
      'Lecture à voix haute par l\'adulte, puis par l\'enfant, en soignant les pauses',
      'Dessiner en trois cases la situation, la dispute et la fin',
      'Mémoriser la fable strophe par strophe sur trois jours',
      'Rejouer la scène à deux voix, l\'un le loup, l\'autre l\'agneau',
    ],
    materials: ['Le texte de la fable imprimé en gros caractères', 'Crayons de couleur', 'Un carnet de récitation'],
    assessment:
      "L'enfant récite la fable entière sans hésitation et explique, en une phrase, pourquoi l'agneau a raison mais perd tout de même. La maîtrise est atteinte quand la récitation est fluide ET que la morale est comprise, non plaquée.",
  },
  {
    chiffre: 'II',
    domain: 'Le Nombre & les Formes',
    age: 'Le raisonnement',
    level: '5ème',
    title: 'La démonstration d\'Euclide : la somme des angles d\'un triangle',
    objectives: [
      'Comprendre ce qu\'est une démonstration, par opposition à une simple vérification',
      'Établir que la somme des angles d\'un triangle vaut toujours 180°',
      'Manier les angles alternes-internes formés par une parallèle',
    ],
    introduction:
      "Mesurer les angles de dix triangles et trouver « à peu près 180° » n'est pas savoir. Savoir, c'est démontrer qu'il en sera toujours ainsi, pour tout triangle possible, sans exception et sans mesure. C'est ce saut — de l'observation à la certitude — qui fait la noblesse de la géométrie.",
    content:
      "On part d'un triangle ABC. On trace, par le sommet A, une droite parallèle au côté BC. Cette parallèle fait apparaître deux nouveaux angles de part et d'autre de l'angle en A. Par le théorème des angles alternes-internes (qu'on aura établi auparavant), ces deux angles sont respectivement égaux aux angles en B et en C du triangle. Or les trois angles autour du point A, sur une même droite, forment un angle plat — c'est-à-dire 180°. Donc la somme des angles du triangle vaut 180°. La conclusion ne dépend d'aucune mesure : elle vaut pour tout triangle. C'est là toute la force de la méthode d'Euclide.",
    activities: [
      'Construire la figure à la règle et au compas, sans approximation',
      'Reconstituer la démonstration oralement, étape par étape, sans la lire',
      'Vérifier par la mesure sur trois triangles très différents, puis comprendre pourquoi la mesure ne « prouve » rien',
      'Découper un triangle en papier et juxtaposer ses trois angles pour former un angle plat',
    ],
    materials: ['Règle, compas, rapporteur', 'Papier blanc et ciseaux', 'Les Éléments d\'Euclide, livre I (extrait)'],
    assessment:
      "L'enfant refait la démonstration au tableau, de mémoire, en justifiant chaque étape. On vérifie qu'il distingue clairement « j'ai mesuré et trouvé 180° » de « j'ai démontré que ce sera toujours 180° ».",
  },
  {
    chiffre: 'III',
    domain: 'Le Monde',
    age: "L'âge des faits",
    level: 'CM1',
    title: 'Lire un arbre : l\'observation d\'un chêne au fil des saisons',
    objectives: [
      'Observer méthodiquement un être vivant et consigner ses observations',
      'Nommer les parties de l\'arbre et reconnaître l\'espèce par sa feuille et son fruit',
      'Comprendre le cycle des saisons à travers un exemple concret et local',
    ],
    introduction:
      "On n'apprend pas la nature dans un manuel : on l'apprend dehors, devant un arbre que l'on revient voir. Choisissons un chêne, à portée de marche, et faisons-en notre maître pour une année. Le manuel viendra après, pour mettre des noms sur ce que l'œil aura déjà vu.",
    content:
      "On choisit un chêne accessible et on le visite à chaque saison. À chaque visite, l'enfant dessine la silhouette de l'arbre, ramasse une feuille, note la date et le temps qu'il fait. On observe : les bourgeons fermés de l'hiver, leur éclatement au printemps, l'ombre dense de l'été, les glands et les couleurs de l'automne. On apprend à reconnaître le chêne à sa feuille lobée et à son gland. On relie ce que l'on voit au mouvement du soleil et à la longueur des jours. L'herbier se constitue feuille après feuille : c'est la mémoire concrète de l'année écoulée.",
    activities: [
      'Adopter un arbre et le visiter à chaque changement de saison',
      'Tenir un carnet d\'observation daté : croquis, météo, hauteur du soleil',
      'Constituer un herbier des feuilles ramassées, pressées et étiquetées',
      'Mesurer le tour du tronc une fois par an, au même endroit, et le comparer',
    ],
    materials: ['Un carnet de terrain', 'Crayons à papier', 'Vieux livres pour presser les feuilles', 'Un mètre ruban'],
    assessment:
      "L'enfant reconnaît le chêne parmi d'autres feuilles, décrit de mémoire ce que devient l'arbre à chaque saison, et explique le lien entre la chute des feuilles et le raccourcissement des jours. L'herbier tenu sur l'année témoigne de la régularité de l'observation.",
  },
  {
    chiffre: 'IV',
    domain: 'Le Corps & la Main',
    age: 'Le raisonnement',
    level: '6ème',
    title: 'Fabriquer un tabouret à trois pieds : la stabilité par le triangle',
    objectives: [
      'Réaliser un objet utile et solide de ses propres mains',
      'Comprendre pourquoi trois points définissent toujours un plan stable',
      'Apprendre les gestes sûrs du travail du bois : mesurer, scier, assembler',
    ],
    introduction:
      "Pourquoi un tabouret à trois pieds ne boite jamais, alors qu'un tabouret à quatre pieds vacille sur un sol irrégulier ? La main qui fabrique va découvrir ce que l'esprit, ensuite, saura nommer : trois points suffisent à définir un plan. On apprend ici en faisant, et la géométrie naît de l'établi.",
    content:
      "On dessine d'abord le tabouret sur papier, avec les cotes exactes. On choisit le bois, on mesure, on marque, on scie trois pieds de longueur rigoureusement égale et une assise. Pendant le travail, on éprouve par la main pourquoi trois pieds reposent toujours à plat : trois points définissent un plan unique, un quatrième pied risque toujours d'être « en trop ». On assemble par tenons ou par vis, on ponce, on vérifie l'équilibre. L'objet fini sert : c'est un vrai tabouret, pas un exercice. La fierté du travail bien fait est elle-même une leçon — celle du soin et de la patience.",
    activities: [
      'Dessiner le plan coté du tabouret avant toute coupe',
      'Mesurer, marquer et scier sous la surveillance de l\'adulte',
      'Tester sur un sol bosselé un support à trois appuis puis à quatre, et conclure',
      'Poncer, assembler, puis se servir réellement du tabouret fabriqué',
    ],
    materials: ['Bois (tasseaux et planche)', 'Scie, mètre, équerre, papier de verre', 'Vis ou tenons et colle à bois', 'Établi ou surface de travail stable'],
    assessment:
      "Le tabouret tient debout sans vaciller et supporte le poids de l'enfant. Celui-ci explique, tabouret en main, pourquoi trois pieds garantissent la stabilité. La maîtrise se juge à l'objet : solide, d'aplomb, fini avec soin.",
  },
]

export function ExemplesGalerie() {
  const [ouvert, setOuvert] = useState<number | null>(0)

  return (
    <section className="px-6 pb-8">
      <div className="max-w-5xl mx-auto space-y-px bg-stone/20">
        {EXEMPLES.map((ex, i) => {
          const isOpen = ouvert === i
          return (
            <AnimateOnScroll key={ex.title} delay={i * 60} className="bg-cream">
              <button
                onClick={() => setOuvert(isOpen ? null : i)}
                className="w-full text-left p-5 md:p-10 flex items-start gap-4 md:gap-6 hover:bg-parchment/40 transition-colors"
              >
                <div
                  className="text-4xl text-gold/40 flex-shrink-0 w-12"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {ex.chiffre}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-gold text-xs tracking-[0.2em] uppercase">{ex.domain}</span>
                    <span className="text-stone/50">·</span>
                    <span className="text-stone text-xs italic">{ex.age}</span>
                    <span className="text-stone/50">·</span>
                    <span className="text-stone text-xs">{ex.level}</span>
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-light text-charcoal leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {ex.title}
                  </h3>
                </div>
                <div
                  className="text-2xl text-stone/60 flex-shrink-0 transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                >
                  +
                </div>
              </button>

              {isOpen && (
                <div className="px-5 md:px-10 pb-10 md:pl-28 space-y-8 animate-fade-in-up">
                  <Bloc titre="Objectifs">
                    <ul className="space-y-2">
                      {ex.objectives.map((o) => (
                        <li key={o} className="text-charcoal/70 flex items-start gap-2 leading-relaxed">
                          <span className="text-gold mt-1.5 text-xs">◆</span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </Bloc>

                  <Bloc titre="Introduction">
                    <p className="text-charcoal/70 leading-relaxed italic">{ex.introduction}</p>
                  </Bloc>

                  <Bloc titre="Déroulé de la leçon">
                    <p className="text-charcoal/70 leading-relaxed">{ex.content}</p>
                  </Bloc>

                  <Bloc titre="Activités">
                    <ol className="space-y-3">
                      {ex.activities.map((a, j) => (
                        <li key={a} className="text-charcoal/70 flex gap-3 leading-relaxed">
                          <span
                            className="text-gold/60 flex-shrink-0"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            {j + 1}.
                          </span>
                          {a}
                        </li>
                      ))}
                    </ol>
                  </Bloc>

                  <div className="grid md:grid-cols-2 gap-8">
                    <Bloc titre="Matériel">
                      <ul className="space-y-1.5">
                        {ex.materials.map((m) => (
                          <li key={m} className="text-charcoal/60 text-sm flex items-start gap-2">
                            <span className="text-gold mt-0.5">·</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </Bloc>
                    <Bloc titre="Évaluation de la maîtrise">
                      <p className="text-charcoal/70 text-sm leading-relaxed">{ex.assessment}</p>
                    </Bloc>
                  </div>
                </div>
              )}
            </AnimateOnScroll>
          )
        })}
      </div>
    </section>
  )
}

function Bloc({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-3">{titre}</p>
      {children}
    </div>
  )
}
