// Le tronc commun d'Alesia.
// Chaque module est rattaché à un domaine et à un âge de progression,
// et déclaré disponible pour une plage de niveaux scolaires.
// Le parent entre par le niveau de l'enfant ; on lui propose alors les
// modules cohérents, regroupés par domaine. Le cours personnalisé reste
// possible en complément.

export const DOMAINS = [
  'Le Verbe',
  'Le Nombre & les Formes',
  'Le Monde',
  'Le Corps & la Main',
] as const

export type Domain = (typeof DOMAINS)[number]

export const AGES = ["L'âge des faits", 'Le raisonnement', "L'expression"] as const
export type Age = (typeof AGES)[number]

export const LEVELS = [
  'CP', 'CE1', 'CE2', 'CM1', 'CM2',
  '6ème', '5ème', '4ème', '3ème',
  '2nde', '1ère', 'Terminale',
] as const
export type Level = (typeof LEVELS)[number]

export type Module = {
  id: string
  subject: string // matière affichée
  title: string // intitulé du module
  topic: string // thème transmis pour la composition
  domain: Domain
  age: Age
  levels: Level[]
}

// Le curriculum, ordonné par domaine puis par progression.
export const CURRICULUM: Module[] = [
  // ───────────── LE VERBE ─────────────
  {
    id: 'verbe-lecture-1',
    subject: 'Français',
    title: 'Lire couramment',
    topic: 'Apprentissage de la lecture : syllabes, mots, premières phrases',
    domain: 'Le Verbe',
    age: "L'âge des faits",
    levels: ['CP', 'CE1'],
  },
  {
    id: 'verbe-recitation-1',
    subject: 'Français',
    title: 'Récitation et mémoire',
    topic: 'Mémoriser et réciter un poème classique avec une diction juste',
    domain: 'Le Verbe',
    age: "L'âge des faits",
    levels: ['CE1', 'CE2', 'CM1', 'CM2'],
  },
  {
    id: 'verbe-grammaire-1',
    subject: 'Français',
    title: 'La phrase et ses fonctions',
    topic: 'Nature et fonction des mots : sujet, verbe, complément',
    domain: 'Le Verbe',
    age: 'Le raisonnement',
    levels: ['CM1', 'CM2', '6ème', '5ème'],
  },
  {
    id: 'verbe-litterature-1',
    subject: 'Français',
    title: 'Lire une œuvre intégrale',
    topic: "Lecture suivie d'un récit classique : personnages, intrigue, sens",
    domain: 'Le Verbe',
    age: 'Le raisonnement',
    levels: ['5ème', '4ème', '3ème'],
  },
  {
    id: 'verbe-rhetorique-1',
    subject: 'Français',
    title: 'Argumenter et persuader',
    topic: "Construire un argument, défendre une thèse, l'art de la dissertation",
    domain: 'Le Verbe',
    age: "L'expression",
    levels: ['2nde', '1ère', 'Terminale'],
  },
  {
    id: 'verbe-latin-1',
    subject: 'Latin',
    title: 'Premiers pas en latin',
    topic: 'Alphabet, prononciation, premières déclinaisons et vocabulaire de base',
    domain: 'Le Verbe',
    age: "L'âge des faits",
    levels: ['5ème', '4ème'],
  },
  {
    id: 'verbe-latin-2',
    subject: 'Latin',
    title: 'Lire les sources',
    topic: 'Traduction de courts textes latins originaux (César, Cicéron)',
    domain: 'Le Verbe',
    age: 'Le raisonnement',
    levels: ['3ème', '2nde', '1ère'],
  },

  // ───────────── LE NOMBRE & LES FORMES ─────────────
  {
    id: 'nombre-numeration-1',
    subject: 'Mathématiques',
    title: 'Compter et dénombrer',
    topic: 'Numération, quantités, addition et soustraction concrètes',
    domain: 'Le Nombre & les Formes',
    age: "L'âge des faits",
    levels: ['CP', 'CE1', 'CE2'],
  },
  {
    id: 'nombre-tables-1',
    subject: 'Mathématiques',
    title: 'Les tables de multiplication',
    topic: 'Mémorisation des tables et sens de la multiplication',
    domain: 'Le Nombre & les Formes',
    age: "L'âge des faits",
    levels: ['CE2', 'CM1', 'CM2'],
  },
  {
    id: 'nombre-fractions-1',
    subject: 'Mathématiques',
    title: 'Fractions et proportions',
    topic: 'Comprendre les fractions, les partages et les proportions',
    domain: 'Le Nombre & les Formes',
    age: 'Le raisonnement',
    levels: ['CM1', 'CM2', '6ème', '5ème'],
  },
  {
    id: 'nombre-geometrie-1',
    subject: 'Mathématiques',
    title: "Géométrie d'Euclide",
    topic: 'Construction à la règle et au compas, premières démonstrations',
    domain: 'Le Nombre & les Formes',
    age: 'Le raisonnement',
    levels: ['5ème', '4ème', '3ème'],
  },
  {
    id: 'nombre-algebre-1',
    subject: 'Mathématiques',
    title: "Algèbre et calcul littéral",
    topic: 'Équations, inconnues et manipulation des expressions littérales',
    domain: 'Le Nombre & les Formes',
    age: 'Le raisonnement',
    levels: ['4ème', '3ème', '2nde'],
  },
  {
    id: 'nombre-physique-1',
    subject: 'Physique-Chimie',
    title: 'Mesurer le monde',
    topic: 'Grandeurs physiques, unités et premières expériences mesurées',
    domain: 'Le Nombre & les Formes',
    age: 'Le raisonnement',
    levels: ['5ème', '4ème', '3ème'],
  },
  {
    id: 'nombre-astronomie-1',
    subject: 'Physique-Chimie',
    title: 'Le ciel et les astres',
    topic: 'Mouvement des planètes, saisons, observation du ciel nocturne',
    domain: 'Le Nombre & les Formes',
    age: "L'âge des faits",
    levels: ['CM1', 'CM2', '6ème', '5ème'],
  },

  // ───────────── LE MONDE ─────────────
  {
    id: 'monde-frise-1',
    subject: 'Histoire',
    title: 'La frise du temps',
    topic: 'Les grandes périodes de l\'histoire et leur succession',
    domain: 'Le Monde',
    age: "L'âge des faits",
    levels: ['CE2', 'CM1', 'CM2'],
  },
  {
    id: 'monde-antiquite-1',
    subject: 'Histoire',
    title: "L'Antiquité gréco-romaine",
    topic: 'Grèce et Rome : cités, institutions, héritage de la civilisation',
    domain: 'Le Monde',
    age: 'Le raisonnement',
    levels: ['6ème', '5ème'],
  },
  {
    id: 'monde-moyenage-1',
    subject: 'Histoire',
    title: 'Le Moyen Âge',
    topic: 'Société féodale, christianisme médiéval, cathédrales et chevalerie',
    domain: 'Le Monde',
    age: 'Le raisonnement',
    levels: ['5ème', '4ème'],
  },
  {
    id: 'monde-geo-1',
    subject: 'Géographie',
    title: 'Lire une carte',
    topic: 'Orientation, échelles, reliefs et lecture du paysage',
    domain: 'Le Monde',
    age: "L'âge des faits",
    levels: ['CM1', 'CM2', '6ème'],
  },
  {
    id: 'monde-svt-vivant-1',
    subject: 'SVT',
    title: 'Observer le vivant',
    topic: 'Le cycle des saisons, observation des plantes et des animaux',
    domain: 'Le Monde',
    age: "L'âge des faits",
    levels: ['CE2', 'CM1', 'CM2'],
  },
  {
    id: 'monde-svt-corps-1',
    subject: 'SVT',
    title: 'Le corps humain',
    topic: 'Grandes fonctions du corps : respiration, digestion, circulation',
    domain: 'Le Monde',
    age: 'Le raisonnement',
    levels: ['6ème', '5ème', '4ème'],
  },

  // ───────────── LE CORPS & LA MAIN ─────────────
  {
    id: 'main-dessin-1',
    subject: 'Arts plastiques',
    title: "Dessiner d'observation",
    topic: 'Apprendre à voir et à reproduire au crayon un objet réel',
    domain: 'Le Corps & la Main',
    age: "L'âge des faits",
    levels: ['CE1', 'CE2', 'CM1', 'CM2', '6ème'],
  },
  {
    id: 'main-musique-1',
    subject: 'Musique',
    title: 'Le rythme et la mélodie',
    topic: 'Battre la mesure, reconnaître les notes, premiers chants',
    domain: 'Le Corps & la Main',
    age: "L'âge des faits",
    levels: ['CP', 'CE1', 'CE2', 'CM1'],
  },
  {
    id: 'main-bois-1',
    subject: 'Arts plastiques',
    title: 'Travail du bois',
    topic: 'Mesurer, scier, assembler : fabriquer un objet simple et solide',
    domain: 'Le Corps & la Main',
    age: 'Le raisonnement',
    levels: ['CM2', '6ème', '5ème', '4ème'],
  },
  {
    id: 'main-jardin-1',
    subject: 'SVT',
    title: 'Jardiner',
    topic: 'Semer, entretenir et récolter : comprendre le vivant par la main',
    domain: 'Le Corps & la Main',
    age: "L'âge des faits",
    levels: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
  },

  // ───────────── LE VERBE (suite) ─────────────
  {
    id: 'verbe-ecriture-1',
    subject: 'Français',
    title: 'Écrire sans faute',
    topic: 'Orthographe des mots courants, accords simples du nom et du verbe',
    domain: 'Le Verbe',
    age: "L'âge des faits",
    levels: ['CE2', 'CM1', 'CM2'],
  },
  {
    id: 'verbe-conjugaison-1',
    subject: 'Français',
    title: 'Conjuguer les temps',
    topic: 'Présent, passé, futur : conjugaison des verbes usuels',
    domain: 'Le Verbe',
    age: "L'âge des faits",
    levels: ['CE2', 'CM1', 'CM2', '6ème'],
  },
  {
    id: 'verbe-redaction-1',
    subject: 'Français',
    title: 'Rédiger un récit',
    topic: "Construire un récit ordonné : début, péripéties, dénouement",
    domain: 'Le Verbe',
    age: 'Le raisonnement',
    levels: ['CM2', '6ème', '5ème', '4ème'],
  },
  {
    id: 'verbe-poesie-1',
    subject: 'Français',
    title: 'La poésie classique',
    topic: 'Vers, rimes et images : lire et goûter les grands poètes',
    domain: 'Le Verbe',
    age: "L'expression",
    levels: ['4ème', '3ème', '2nde', '1ère'],
  },
  {
    id: 'verbe-anglais-1',
    subject: 'Anglais',
    title: 'Premiers mots d\'anglais',
    topic: 'Vocabulaire du quotidien, salutations et phrases simples',
    domain: 'Le Verbe',
    age: "L'âge des faits",
    levels: ['CE2', 'CM1', 'CM2', '6ème'],
  },
  {
    id: 'verbe-anglais-2',
    subject: 'Anglais',
    title: 'Lire et raconter en anglais',
    topic: 'Lecture de courts textes et récit oral au passé',
    domain: 'Le Verbe',
    age: 'Le raisonnement',
    levels: ['5ème', '4ème', '3ème'],
  },
  {
    id: 'verbe-latin-3',
    subject: 'Latin',
    title: 'La civilisation romaine',
    topic: "Vie quotidienne, institutions et mythes de la Rome antique",
    domain: 'Le Verbe',
    age: "L'âge des faits",
    levels: ['5ème', '4ème', '3ème'],
  },

  // ───────────── LE NOMBRE & LES FORMES (suite) ─────────────
  {
    id: 'nombre-grandeurs-1',
    subject: 'Mathématiques',
    title: 'Mesures et grandeurs',
    topic: 'Longueurs, masses, durées : mesurer et convertir',
    domain: 'Le Nombre & les Formes',
    age: "L'âge des faits",
    levels: ['CE2', 'CM1', 'CM2'],
  },
  {
    id: 'nombre-decimaux-1',
    subject: 'Mathématiques',
    title: 'Nombres décimaux',
    topic: 'Comprendre et calculer avec les nombres à virgule',
    domain: 'Le Nombre & les Formes',
    age: 'Le raisonnement',
    levels: ['CM1', 'CM2', '6ème'],
  },
  {
    id: 'nombre-fonctions-1',
    subject: 'Mathématiques',
    title: 'Fonctions et graphiques',
    topic: 'Notion de fonction, lecture et tracé de courbes',
    domain: 'Le Nombre & les Formes',
    age: 'Le raisonnement',
    levels: ['3ème', '2nde', '1ère'],
  },
  {
    id: 'nombre-trigo-1',
    subject: 'Mathématiques',
    title: 'Trigonométrie',
    topic: 'Sinus, cosinus, tangente et résolution de triangles',
    domain: 'Le Nombre & les Formes',
    age: "L'expression",
    levels: ['1ère', 'Terminale'],
  },
  {
    id: 'nombre-logique-1',
    subject: 'Mathématiques',
    title: 'Logique et démonstration',
    topic: 'Raisonnement, implication, contre-exemple et preuve rigoureuse',
    domain: 'Le Nombre & les Formes',
    age: "L'expression",
    levels: ['2nde', '1ère', 'Terminale'],
  },
  {
    id: 'nombre-chimie-1',
    subject: 'Physique-Chimie',
    title: 'La matière et ses états',
    topic: 'Solide, liquide, gaz : transformations et propriétés de la matière',
    domain: 'Le Nombre & les Formes',
    age: 'Le raisonnement',
    levels: ['5ème', '4ème', '3ème'],
  },
  {
    id: 'nombre-energie-1',
    subject: 'Physique-Chimie',
    title: 'Énergie et électricité',
    topic: 'Circuits simples, formes et conservation de l\'énergie',
    domain: 'Le Nombre & les Formes',
    age: 'Le raisonnement',
    levels: ['4ème', '3ème', '2nde'],
  },

  // ───────────── LE MONDE (suite) ─────────────
  {
    id: 'monde-prehistoire-1',
    subject: 'Histoire',
    title: 'La Préhistoire',
    topic: 'Premiers hommes, feu, outils et naissance de l\'agriculture',
    domain: 'Le Monde',
    age: "L'âge des faits",
    levels: ['CE2', 'CM1', '6ème'],
  },
  {
    id: 'monde-tempsmodernes-1',
    subject: 'Histoire',
    title: 'Renaissance et grandes découvertes',
    topic: 'Humanisme, imprimerie et exploration du monde',
    domain: 'Le Monde',
    age: 'Le raisonnement',
    levels: ['5ème', '4ème'],
  },
  {
    id: 'monde-revolution-1',
    subject: 'Histoire',
    title: 'La Révolution française',
    topic: '1789 : causes, événements et héritage de la Révolution',
    domain: 'Le Monde',
    age: 'Le raisonnement',
    levels: ['4ème', '3ème'],
  },
  {
    id: 'monde-xxe-1',
    subject: 'Histoire',
    title: 'Le XXe siècle',
    topic: 'Guerres mondiales, totalitarismes et reconstruction',
    domain: 'Le Monde',
    age: "L'expression",
    levels: ['3ème', '1ère', 'Terminale'],
  },
  {
    id: 'monde-geo-france-1',
    subject: 'Géographie',
    title: 'La France, ses régions',
    topic: 'Reliefs, fleuves, climats et régions du territoire français',
    domain: 'Le Monde',
    age: "L'âge des faits",
    levels: ['CM1', 'CM2', '6ème'],
  },
  {
    id: 'monde-geo-climats-1',
    subject: 'Géographie',
    title: 'Climats et milieux',
    topic: 'Grands climats de la planète et milieux de vie associés',
    domain: 'Le Monde',
    age: 'Le raisonnement',
    levels: ['6ème', '5ème', '4ème'],
  },
  {
    id: 'monde-svt-eco-1',
    subject: 'SVT',
    title: 'Les écosystèmes',
    topic: 'Chaînes alimentaires, équilibres et milieux naturels',
    domain: 'Le Monde',
    age: 'Le raisonnement',
    levels: ['6ème', '5ème', '4ème'],
  },
  {
    id: 'monde-svt-genetique-1',
    subject: 'SVT',
    title: 'Hérédité et génétique',
    topic: 'Cellules, ADN et transmission des caractères',
    domain: 'Le Monde',
    age: "L'expression",
    levels: ['3ème', '2nde', '1ère'],
  },

  // ───────────── LE CORPS & LA MAIN (suite) ─────────────
  {
    id: 'main-eps-1',
    subject: 'Éducation physique',
    title: 'Courir, sauter, lancer',
    topic: 'Athlétisme de base : maîtrise du geste et de l\'effort',
    domain: 'Le Corps & la Main',
    age: "L'âge des faits",
    levels: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
  },
  {
    id: 'main-eps-2',
    subject: 'Éducation physique',
    title: 'Les jeux collectifs',
    topic: 'Sports d\'équipe : règles, coopération et esprit de jeu',
    domain: 'Le Corps & la Main',
    age: 'Le raisonnement',
    levels: ['CM1', 'CM2', '6ème', '5ème', '4ème'],
  },
  {
    id: 'main-peinture-1',
    subject: 'Arts plastiques',
    title: 'La couleur et la peinture',
    topic: 'Mélanges, nuances et composition d\'une œuvre peinte',
    domain: 'Le Corps & la Main',
    age: 'Le raisonnement',
    levels: ['CE2', 'CM1', 'CM2', '6ème', '5ème'],
  },
  {
    id: 'main-musique-2',
    subject: 'Musique',
    title: 'Apprendre un instrument',
    topic: 'Premiers pas instrumentaux : posture, notes et morceau simple',
    domain: 'Le Corps & la Main',
    age: 'Le raisonnement',
    levels: ['CE2', 'CM1', 'CM2', '6ème', '5ème'],
  },
  {
    id: 'main-cuisine-1',
    subject: 'Arts plastiques',
    title: 'Cuisiner',
    topic: 'Mesurer, doser et réaliser une recette simple de ses mains',
    domain: 'Le Corps & la Main',
    age: "L'âge des faits",
    levels: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
  },

  // ───────────── LE VERBE — Philosophie ─────────────
  {
    id: 'verbe-philo-intro-1',
    subject: 'Philosophie',
    title: 'Introduction à la philosophie',
    topic: "Qu'est-ce que philosopher ? L'étonnement, le doute et la recherche du sens",
    domain: 'Le Verbe',
    age: 'Le raisonnement',
    levels: ['3ème', '2nde'],
  },
  {
    id: 'verbe-philo-philosophes-1',
    subject: 'Philosophie',
    title: 'Les grands philosophes',
    topic: 'Socrate, Platon, Aristote, Descartes : vie, œuvre et idées maîtresses',
    domain: 'Le Verbe',
    age: 'Le raisonnement',
    levels: ['3ème', '2nde', '1ère'],
  },
  {
    id: 'verbe-philo-ethique-1',
    subject: 'Philosophie',
    title: 'Éthique et morale',
    topic: 'Le bien, le mal, la liberté et la responsabilité : penser l\'action juste',
    domain: 'Le Verbe',
    age: "L'expression",
    levels: ['1ère', 'Terminale'],
  },
  {
    id: 'verbe-philo-logique-1',
    subject: 'Philosophie',
    title: 'Logique philosophique',
    topic: 'Syllogismes, raisonnements valides et sophismes : l\'art d\'argumenter juste',
    domain: 'Le Verbe',
    age: "L'expression",
    levels: ['1ère', 'Terminale'],
  },

  // ───────────── LE VERBE — Petits niveaux ─────────────
  {
    id: 'verbe-lettres-1',
    subject: 'Français',
    title: 'Les premières lettres',
    topic: 'Reconnaissance et tracé des lettres de l\'alphabet, sons et associations',
    domain: 'Le Verbe',
    age: "L'âge des faits",
    levels: ['CP', 'CE1'],
  },
  {
    id: 'verbe-histoires-1',
    subject: 'Français',
    title: 'Premières histoires',
    topic: 'Écouter, comprendre et raconter de courtes histoires simples',
    domain: 'Le Verbe',
    age: "L'âge des faits",
    levels: ['CP', 'CE1'],
  },

  // ───────────── LE MONDE — Géographie (suite) ─────────────
  {
    id: 'monde-geo-mondialisation-1',
    subject: 'Géographie',
    title: 'La mondialisation',
    topic: 'Échanges, flux et inégalités à l\'échelle mondiale',
    domain: 'Le Monde',
    age: "L'expression",
    levels: ['3ème', '2nde', '1ère'],
  },
  {
    id: 'monde-geo-geopolitique-1',
    subject: 'Géographie',
    title: 'Géopolitique du monde contemporain',
    topic: 'Puissances, conflits et organisations internationales au XXIe siècle',
    domain: 'Le Monde',
    age: "L'expression",
    levels: ['1ère', 'Terminale'],
  },
  {
    id: 'monde-geo-environnement-1',
    subject: 'Géographie',
    title: 'Géographie de l\'environnement',
    topic: 'Ressources naturelles, risques et développement durable',
    domain: 'Le Monde',
    age: "L'expression",
    levels: ['3ème', '2nde', '1ère', 'Terminale'],
  },

  // ───────────── LE MONDE — SVT lycée ─────────────
  {
    id: 'monde-svt-evolution-1',
    subject: 'SVT',
    title: 'L\'évolution du vivant',
    topic: 'Sélection naturelle, Darwin et les mécanismes de l\'évolution',
    domain: 'Le Monde',
    age: "L'expression",
    levels: ['2nde', '1ère', 'Terminale'],
  },
  {
    id: 'monde-svt-ecologie-1',
    subject: 'SVT',
    title: 'Écologie et crise environnementale',
    topic: 'Biodiversité, cycles biogéochimiques et impact humain sur les écosystèmes',
    domain: 'Le Monde',
    age: "L'expression",
    levels: ['2nde', '1ère', 'Terminale'],
  },

  // ───────────── LE NOMBRE & LES FORMES — Physique-Chimie lycée ─────────────
  {
    id: 'nombre-mecanique-1',
    subject: 'Physique-Chimie',
    title: 'Mécanique et mouvement',
    topic: 'Forces, lois de Newton, cinématique et dynamique du point',
    domain: 'Le Nombre & les Formes',
    age: "L'expression",
    levels: ['2nde', '1ère', 'Terminale'],
  },
  {
    id: 'nombre-optique-1',
    subject: 'Physique-Chimie',
    title: 'Optique géométrique',
    topic: 'Lumière, lentilles, miroirs et formation des images',
    domain: 'Le Nombre & les Formes',
    age: "L'expression",
    levels: ['2nde', '1ère', 'Terminale'],
  },

  // ───────────── LE CORPS & LA MAIN — lycée ─────────────
  {
    id: 'main-sport-performance-1',
    subject: 'Éducation physique',
    title: 'Sport et performance',
    topic: 'Entraînement, physiologie de l\'effort et dépassement de soi',
    domain: 'Le Corps & la Main',
    age: "L'expression",
    levels: ['2nde', '1ère', 'Terminale'],
  },
  {
    id: 'main-dessin-technique-1',
    subject: 'Arts plastiques',
    title: 'Architecture et dessin technique',
    topic: 'Plans, coupes et perspectives : représenter l\'espace bâti',
    domain: 'Le Corps & la Main',
    age: "L'expression",
    levels: ['3ème', '2nde', '1ère', 'Terminale'],
  },
]

// Modules disponibles pour un niveau donné, regroupés par domaine.
export function modulesForLevel(level: string): Record<Domain, Module[]> {
  const grouped = {
    'Le Verbe': [],
    'Le Nombre & les Formes': [],
    'Le Monde': [],
    'Le Corps & la Main': [],
  } as Record<Domain, Module[]>

  for (const m of CURRICULUM) {
    if (m.levels.includes(level as Level)) {
      grouped[m.domain].push(m)
    }
  }
  // Ordonner chaque domaine selon la progression des trois âges.
  for (const d of DOMAINS) {
    grouped[d].sort((a, b) => AGES.indexOf(a.age) - AGES.indexOf(b.age))
  }
  return grouped
}
