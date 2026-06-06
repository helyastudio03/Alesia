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
  return grouped
}
