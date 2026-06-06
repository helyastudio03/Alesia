import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, BookOpen, Clock } from 'lucide-react'

const mockLessons = [
  {
    id: '1',
    title: 'Introduction aux fractions avec les pizzas',
    subject: 'Mathématiques',
    grade_level: 'CE2',
    duration_minutes: 45,
    status: 'completed' as const,
    child_name: 'Emma',
    created_at: '2024-01-15',
  },
  {
    id: '2',
    title: 'La Révolution française : causes et conséquences',
    subject: 'Histoire',
    grade_level: '5ème',
    duration_minutes: 60,
    status: 'active' as const,
    child_name: 'Lucas',
    created_at: '2024-01-18',
  },
]

const statusConfig = {
  draft: { label: 'Brouillon', className: 'bg-gray-100 text-gray-700' },
  active: { label: 'En cours', className: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Terminée', className: 'bg-green-100 text-green-700' },
}

export default function LeconsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bibliothèque de leçons</h1>
          <p className="text-gray-600 mt-1">Toutes vos leçons générées et sauvegardées</p>
        </div>
        <Button asChild className="bg-violet-600 hover:bg-violet-700">
          <Link href="/generateur">
            <Sparkles className="h-4 w-4 mr-2" />
            Nouvelle leçon
          </Link>
        </Button>
      </div>

      {mockLessons.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune leçon</h3>
          <p className="text-gray-600 mb-6">Composez votre première leçon.</p>
          <Button asChild className="bg-violet-600 hover:bg-violet-700">
            <Link href="/generateur">
              <Sparkles className="h-4 w-4 mr-2" />
              Générer une leçon
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockLessons.map((lesson) => {
            const status = statusConfig[lesson.status]
            return (
              <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">{lesson.title}</CardTitle>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-xs">{lesson.subject}</Badge>
                      <Badge variant="secondary" className="text-xs">{lesson.grade_level}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {lesson.duration_minutes} min
                      </span>
                      <span>Pour {lesson.child_name}</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button asChild variant="outline" size="sm" className="flex-1 text-xs">
                        <Link href={`/lecons/${lesson.id}`}>Voir la leçon</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
