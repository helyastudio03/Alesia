'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'

const GRADE_LEVELS = [
  'TPS', 'PS', 'MS', 'GS',
  'CP', 'CE1', 'CE2', 'CM1', 'CM2',
  '6ème', '5ème', '4ème', '3ème',
  '2nde', '1ère', 'Terminale'
]

const LEARNING_STYLES = [
  { value: 'visuel', label: "Visuel - Apprend par les images et schémas" },
  { value: 'auditif', label: "Auditif - Apprend par l'écoute" },
  { value: 'kinesthesique', label: 'Kinesthésique - Apprend par la pratique' },
  { value: 'lecture', label: 'Lecture/Écriture - Apprend par les textes' },
]

const SUBJECTS_LIST = [
  'Mathématiques', 'Français', 'Histoire-Géographie', 'Sciences',
  'Anglais', 'Arts plastiques', 'Musique', 'EPS', 'Philosophie',
  'SVT', 'Physique-Chimie', 'Informatique', 'Latin'
]

export default function NouvelEnfantPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    grade_level: '',
    learning_style: '',
    notes: '',
  })
  const [interests, setInterests] = useState<string[]>([])
  const [subjects, setSubjects] = useState<string[]>([])
  const [newInterest, setNewInterest] = useState('')

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest('')
    }
  }

  const toggleSubject = (subject: string) => {
    setSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Save to Supabase
    await new Promise(r => setTimeout(r, 1000))
    router.push('/enfants')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/enfants" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Retour aux profils
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Nouveau profil enfant</h1>
        <p className="text-gray-600 mt-1">Renseignez les informations de votre enfant pour personnaliser ses leçons.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Identité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">Prénom *</Label>
                <Input
                  id="first_name"
                  value={form.first_name}
                  onChange={e => setForm({...form, first_name: e.target.value})}
                  placeholder="Emma"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Nom *</Label>
                <Input
                  id="last_name"
                  value={form.last_name}
                  onChange={e => setForm({...form, last_name: e.target.value})}
                  placeholder="Dupont"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth_date">Date de naissance *</Label>
              <Input
                id="birth_date"
                type="date"
                value={form.birth_date}
                onChange={e => setForm({...form, birth_date: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade_level">Niveau scolaire *</Label>
              <Select value={form.grade_level} onValueChange={v => setForm({...form, grade_level: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un niveau" />
                </SelectTrigger>
                <SelectContent>
                  {GRADE_LEVELS.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Style d&apos;apprentissage</CardTitle>
            <CardDescription>Comment votre enfant apprend-il le mieux ?</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={form.learning_style} onValueChange={v => setForm({...form, learning_style: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un style" />
              </SelectTrigger>
              <SelectContent>
                {LEARNING_STYLES.map(style => (
                  <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Centres d&apos;intérêt</CardTitle>
            <CardDescription>Ajoutez les sujets qui passionnent votre enfant pour personnaliser les exemples.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newInterest}
                onChange={e => setNewInterest(e.target.value)}
                placeholder="Ex: Dinosaures, Minecraft, Football..."
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addInterest())}
              />
              <Button type="button" variant="outline" onClick={addInterest}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {interests.map(interest => (
                  <Badge key={interest} variant="secondary" className="gap-1 pr-1">
                    {interest}
                    <button type="button" onClick={() => setInterests(interests.filter(i => i !== interest))}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Matières enseignées</CardTitle>
            <CardDescription>Sélectionnez les matières que vous enseignez.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS_LIST.map(subject => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    subjects.includes(subject)
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes complémentaires</CardTitle>
            <CardDescription>Informations utiles sur votre enfant (difficultés, forces, besoins spéciaux...)</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={form.notes}
              onChange={e => setForm({...form, notes: e.target.value})}
              placeholder="Ex: Emma a du mal avec la lecture mais adore les maths. Elle est très créative et aime dessiner..."
              rows={4}
            />
          </CardContent>
        </Card>

        <div className="flex gap-3 pb-8">
          <Button type="button" variant="outline" asChild className="flex-1">
            <Link href="/enfants">Annuler</Link>
          </Button>
          <Button type="submit" className="flex-1 bg-violet-600 hover:bg-violet-700" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Créer le profil'}
          </Button>
        </div>
      </form>
    </div>
  )
}
