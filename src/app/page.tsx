import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BookOpen, Users, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          Propulsé par l&apos;IA Claude d&apos;Anthropic
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          L&apos;éducation à la maison,{' '}
          <span className="text-violet-600">simplifiée</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Alesia vous aide à créer des leçons personnalisées pour vos enfants,
          adaptées à leur niveau et leurs centres d&apos;intérêt.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700">
            <Link href="/enfants/nouveau">Créer un profil enfant</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/generateur">Générer une leçon</Link>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-violet-600" />
            </div>
            <CardTitle>Profils enfants</CardTitle>
            <CardDescription>
              Créez des profils détaillés pour chaque enfant avec leur niveau, style d&apos;apprentissage et intérêts.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle>Leçons IA</CardTitle>
            <CardDescription>
              Générez des plans de leçon complets et personnalisés en quelques secondes grâce à l&apos;IA.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <CardTitle>Bibliothèque</CardTitle>
            <CardDescription>
              Sauvegardez et organisez toutes vos leçons pour les réutiliser et les adapter.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Comment ça marche</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Créez le profil', desc: "Renseignez le niveau scolaire, le style d'apprentissage et les intérêts de votre enfant." },
            { step: '2', title: 'Choisissez la matière', desc: 'Sélectionnez la matière et le sujet que vous souhaitez enseigner.' },
            { step: '3', title: 'Obtenez votre leçon', desc: "L'IA génère un plan de leçon complet avec objectifs, activités et évaluation." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
