import type { Domain } from '@/lib/curriculum'

// Données mock partagées — seront remplacées par Supabase.
// Centralisées ici pour que les pages /enfants, /enfants/[id] et le
// générateur partagent une seule source de vérité.
export type Child = {
  id: string
  first_name: string
  birth_date: string
  grade_level: string
  learning_style: string
  domains: Domain[]
  interests: string[]
  notes: string
}

export const MOCK_CHILDREN: Child[] = [
  {
    id: '1',
    first_name: 'Emma',
    birth_date: '2015-03-15',
    grade_level: 'CE2',
    learning_style: 'visuel',
    domains: ['Le Verbe', 'Le Nombre & les Formes', 'Le Monde'],
    interests: ['Sciences', 'Dessin', 'Nature'],
    notes: 'Excellente mémoire, très attirée par les sciences naturelles. Courtes séances recommandées.',
  },
  {
    id: '2',
    first_name: 'Lucas',
    birth_date: '2012-07-22',
    grade_level: '5ème',
    learning_style: 'kinesthesique',
    domains: ['Le Monde', 'Le Corps & la Main', 'Le Nombre & les Formes'],
    interests: ['Histoire', 'Musique', 'Sport'],
    notes: '',
  },
]

export const LEARNING_STYLE_LABELS: Record<string, string> = {
  visuel: 'Visuel',
  auditif: 'Auditif',
  kinesthesique: 'Kinesthésique',
  lecture: 'Lecture / Écriture',
}

export function getChild(id: string): Child | undefined {
  return MOCK_CHILDREN.find(c => c.id === id)
}

export function getAge(birthDate: string) {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}
