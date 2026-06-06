import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, User } from 'lucide-react'

const mockChildren = [
  {
    id: '1',
    first_name: 'Emma',
    last_name: 'Dupont',
    birth_date: '2015-03-15',
    grade_level: 'CE2',
    learning_style: 'Visuel',
    interests: ['Sciences', 'Dessin', 'Nature'],
    subjects: ['Mathématiques', 'Français', 'Sciences'],
  },
  {
    id: '2',
    first_name: 'Lucas',
    last_name: 'Dupont',
    birth_date: '2012-07-22',
    grade_level: '5ème',
    learning_style: 'Kinesthésique',
    interests: ['Histoire', 'Musique', 'Sport'],
    subjects: ['Histoire-Géo', 'Mathématiques', 'Français'],
  },
]

function getAge(birthDate: string) {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

export default function EnfantsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12" style={{ borderBottom: '1px solid #8b7355', paddingBottom: '1.5rem' }}>
        <div>
          <h1
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a3a2a', fontSize: '2rem' }}
            className="mb-1"
          >
            Mes enfants
          </h1>
          <p style={{ color: '#8b7355', fontSize: '0.875rem' }}>Gérez les profils de vos enfants</p>
        </div>
        <Link
          href="/enfants/nouveau"
          style={{ color: '#1a3a2a', border: '1px solid #1a3a2a', fontSize: '0.75rem', letterSpacing: '0.1em' }}
          className="flex items-center gap-2 px-5 py-2 uppercase hover:bg-green-50 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Ajouter un enfant
        </Link>
      </div>

      {mockChildren.length === 0 ? (
        <div className="text-center py-20">
          <User className="h-10 w-10 mx-auto mb-6" style={{ color: '#8b7355' }} />
          <h3
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a3a2a', fontSize: '1.25rem' }}
            className="mb-3"
          >
            Aucun enfant
          </h3>
          <p style={{ color: '#8b7355' }} className="mb-8 text-sm">Commencez par créer le profil de votre premier enfant.</p>
          <Link
            href="/enfants/nouveau"
            style={{ color: '#1a3a2a', border: '1px solid #1a3a2a', fontSize: '0.75rem', letterSpacing: '0.1em' }}
            className="inline-flex items-center gap-2 px-5 py-2 uppercase hover:bg-green-50 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Créer un profil
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockChildren.map((child) => (
            <div
              key={child.id}
              style={{ backgroundColor: '#faf7f2', border: '1px solid #d5cfc5', borderTop: '2px solid #b8962e' }}
              className="p-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  style={{ backgroundColor: '#f5f0e8', border: '1px solid #8b7355', color: '#1a3a2a', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.25rem', fontWeight: 600 }}
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                >
                  {child.first_name[0]}
                </div>
                <div>
                  <h2
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1c1c', fontSize: '1.125rem' }}
                  >
                    {child.first_name} {child.last_name}
                  </h2>
                  <p style={{ color: '#8b7355', fontSize: '0.8rem' }}>{getAge(child.birth_date)} ans · {child.grade_level}</p>
                </div>
              </div>

              <div className="space-y-4">
                {child.learning_style && (
                  <div>
                    <p style={{ color: '#8b7355', fontSize: '0.7rem', letterSpacing: '0.1em' }} className="uppercase mb-1">Style</p>
                    <span style={{ color: '#1c1c1c', border: '1px solid #d5cfc5', fontSize: '0.8rem' }} className="inline-block px-2 py-0.5">
                      {child.learning_style}
                    </span>
                  </div>
                )}
                {child.interests && child.interests.length > 0 && (
                  <div>
                    <p style={{ color: '#8b7355', fontSize: '0.7rem', letterSpacing: '0.1em' }} className="uppercase mb-1">Intérêts</p>
                    <div className="flex flex-wrap gap-1">
                      {child.interests.map((interest) => (
                        <span key={interest} style={{ color: '#1c1c1c', border: '1px solid #d5cfc5', fontSize: '0.75rem' }} className="inline-block px-2 py-0.5">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {child.subjects && child.subjects.length > 0 && (
                  <div>
                    <p style={{ color: '#8b7355', fontSize: '0.7rem', letterSpacing: '0.1em' }} className="uppercase mb-1">Matières</p>
                    <div className="flex flex-wrap gap-1">
                      {child.subjects.map((subject) => (
                        <span key={subject} style={{ backgroundColor: '#1a3a2a', color: '#f5f0e8', fontSize: '0.75rem' }} className="inline-block px-2 py-0.5">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid #e8e0d0' }}>
                  <Link
                    href={`/enfants/${child.id}`}
                    style={{ color: '#1a3a2a', border: '1px solid #1a3a2a', fontSize: '0.75rem', letterSpacing: '0.05em' }}
                    className="flex-1 text-center py-2 uppercase hover:bg-green-50 transition-colors"
                  >
                    Profil
                  </Link>
                  <Link
                    href={`/generateur?enfant=${child.id}`}
                    style={{ backgroundColor: '#1a3a2a', color: '#f5f0e8', fontSize: '0.75rem', letterSpacing: '0.05em' }}
                    className="flex-1 text-center py-2 uppercase hover:opacity-90 transition-opacity"
                  >
                    Leçon
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
