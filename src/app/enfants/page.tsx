import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, User, Sparkles } from 'lucide-react'

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes enfants</h1>
          <p className="text-gray-600 mt-1">Gérez les profils de vos enfants</p>
        </div>
        <Button asChild className="bg-violet-600 hover:bg-violet-700">
          <Link href="/enfants/nouveau">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un enfant
          </Link>
        </Button>
      </div>

      {mockChildren.length === 0 ? (
        <div className="text-center py-16">
          <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun enfant</h3>
          <p className="text-gray-600 mb-6">Commencez par créer le profil de votre premier enfant.</p>
          <Button asChild className="bg-violet-600 hover:bg-violet-700">
            <Link href="/enfants/nouveau">
              <Plus className="h-4 w-4 mr-2" />
              Créer un profil
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockChildren.map((child) => (
            <Card key={child.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {child.first_name[0]}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{child.first_name} {child.last_name}</CardTitle>
                    <p className="text-sm text-gray-500">{getAge(child.birth_date)} ans · {child.grade_level}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {child.learning_style && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Style</p>
                      <Badge variant="secondary">{child.learning_style}</Badge>
                    </div>
                  )}
                  {child.interests && child.interests.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Intérêts</p>
                      <div className="flex flex-wrap gap-1">
                        {child.interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="text-xs">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {child.subjects && child.subjects.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Matières</p>
                      <div className="flex flex-wrap gap-1">
                        {child.subjects.map((subject) => (
                          <Badge key={subject} className="text-xs bg-violet-100 text-violet-700 hover:bg-violet-100">{subject}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/enfants/${child.id}`}>
                        <User className="h-3.5 w-3.5 mr-1.5" />
                        Profil
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1 bg-violet-600 hover:bg-violet-700">
                      <Link href={`/generateur?enfant=${child.id}`}>
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                        Leçon
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
