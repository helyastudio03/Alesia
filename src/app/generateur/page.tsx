'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sparkles, BookOpen, Clock, Target, Wrench, ClipboardList, ChevronRight, Loader2, Copy, Printer, Check } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { parsePartialJSON } from '@/lib/partial-json'

const SUBJECTS = [
  'Mathématiques', 'Français', 'Histoire', 'Géographie',
  'Anglais', 'Arts plastiques', 'Musique', 'SVT', 'Physique-Chimie',
  'Philosophie', 'Informatique', 'Latin'
]

const GRADE_LEVELS = [
  'CP', 'CE1', 'CE2', 'CM1', 'CM2',
  '6ème', '5ème', '4ème', '3ème',
  '2nde', '1ère', 'Terminale'
]

const DURATIONS = ['30', '45', '60', '90', '120']

type LessonResult = {
  title: string
  domain?: string
  age?: string
  objectives: string[]
  introduction: string
  content: string
  activities: string[]
  materials: string[]
  assessment: string
  tips: string
}

export default function GenerateurPage() {
  const [form, setForm] = useState({
    subject: '',
    gradeLevel: '',
    topic: '',
    duration: '45',
    learningStyle: '',
    interests: '',
    additionalContext: '',
  })
  const [copied, setCopied] = useState(false)

  const copyLesson = async () => {
    if (!lesson) return
    const lines: string[] = []
    if (lesson.title) lines.push(`# ${lesson.title}`)
    if (lesson.domain || lesson.age) lines.push(`${lesson.domain ?? ''} · ${lesson.age ?? ''}`.trim())
    lines.push('')
    if (lesson.objectives?.length) {
      lines.push('## Objectifs')
      lesson.objectives.forEach(o => lines.push(`- ${o}`))
      lines.push('')
    }
    if (lesson.introduction) lines.push(`## Introduction\n${lesson.introduction}\n`)
    if (lesson.content) lines.push(`## Contenu\n${lesson.content}\n`)
    if (lesson.activities?.length) {
      lines.push('## Activités')
      lesson.activities.forEach((a, i) => lines.push(`${i + 1}. ${a}`))
      lines.push('')
    }
    if (lesson.materials?.length) lines.push(`## Matériel\n${lesson.materials.join(', ')}\n`)
    if (lesson.assessment) lines.push(`## Évaluation\n${lesson.assessment}\n`)
    if (lesson.tips) lines.push(`## Conseils\n${lesson.tips}`)
    await navigator.clipboard.writeText(lines.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const printLesson = () => window.print()

  const [loading, setLoading] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [lesson, setLesson] = useState<Partial<LessonResult> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!form.subject || !form.gradeLevel || !form.topic) return

    setLoading(true)
    setStreaming(false)
    setError(null)
    setLesson(null)

    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok || !response.body) throw new Error('Erreur lors de la génération')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        accumulated += decoder.decode(value, { stream: true })
        const partial = parsePartialJSON<LessonResult>(accumulated)
        if (partial) {
          setLesson(partial)
          setStreaming(true)
        }
      }

      // Parse final propre une fois le flux terminé.
      const final = parsePartialJSON<LessonResult>(accumulated)
      if (final) setLesson(final)
    } catch {
      setError('Une erreur est survenue. Vérifiez votre clé API Anthropic.')
      setLesson(null)
    } finally {
      setLoading(false)
      setStreaming(false)
    }
  }

  const canGenerate = form.subject && form.gradeLevel && form.topic && !loading

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          Générateur IA
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Générer une leçon</h1>
        <p className="text-gray-600 mt-1">Renseignez les détails et l&apos;IA créera une leçon complète et personnalisée.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Paramètres de la leçon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Matière *</Label>
                <Select value={form.subject} onValueChange={v => setForm({...form, subject: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Niveau *</Label>
                <Select value={form.gradeLevel} onValueChange={v => setForm({...form, gradeLevel: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADE_LEVELS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sujet / Thème *</Label>
                <Input
                  value={form.topic}
                  onChange={e => setForm({...form, topic: e.target.value})}
                  placeholder="Ex: Les fractions, La Révolution française..."
                />
              </div>

              <div className="space-y-2">
                <Label>Durée (minutes)</Label>
                <Select value={form.duration} onValueChange={v => setForm({...form, duration: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATIONS.map(d => <SelectItem key={d} value={d}>{d} min</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Style d&apos;apprentissage</Label>
                <Select value={form.learningStyle} onValueChange={v => setForm({...form, learningStyle: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Optionnel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visuel">Visuel</SelectItem>
                    <SelectItem value="auditif">Auditif</SelectItem>
                    <SelectItem value="kinesthesique">Kinesthésique</SelectItem>
                    <SelectItem value="lecture">Lecture/Écriture</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Centres d&apos;intérêt de l&apos;enfant</Label>
                <Input
                  value={form.interests}
                  onChange={e => setForm({...form, interests: e.target.value})}
                  placeholder="Ex: Dinosaures, Football, Minecraft"
                />
              </div>

              <div className="space-y-2">
                <Label>Contexte supplémentaire</Label>
                <Textarea
                  value={form.additionalContext}
                  onChange={e => setForm({...form, additionalContext: e.target.value})}
                  placeholder="Informations utiles: difficultés particulières, objectifs spécifiques..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="w-full bg-violet-600 hover:bg-violet-700 h-12 text-base"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Générer la leçon
              </>
            )}
          </Button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Result */}
        <div className="lg:col-span-3">
          {!lesson && !loading && (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-12">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Votre leçon apparaîtra ici</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Renseignez la matière, le niveau et le sujet, puis cliquez sur &quot;Générer&quot;.
                </p>
              </div>
            </div>
          )}

          {loading && !lesson && (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-violet-200 bg-violet-50 rounded-xl p-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-6 w-6 text-violet-600 animate-spin" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Génération en cours...</h3>
                <p className="text-gray-500 text-sm">L&apos;IA prépare votre leçon personnalisée.</p>
              </div>
            </div>
          )}

          {lesson && (
            <div id="lesson-print" className="space-y-4">
              <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-1 no-print">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-violet-600">{form.subject}</Badge>
                      <Badge variant="outline">{form.gradeLevel}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {form.duration} min
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyLesson}
                        className="h-8 px-2 text-gray-500 hover:text-gray-800"
                        title="Copier en Markdown"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        <span className="ml-1 text-xs">{copied ? 'Copié !' : 'Copier'}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={printLesson}
                        className="h-8 px-2 text-gray-500 hover:text-gray-800"
                        title="Imprimer / Enregistrer en PDF"
                      >
                        <Printer className="h-4 w-4" />
                        <span className="ml-1 text-xs">Imprimer</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 print-only" style={{ display: 'none' }}>
                    <span className="font-semibold">{form.subject}</span>
                    <span>·</span>
                    <span>{form.gradeLevel}</span>
                    <span>·</span>
                    <span>{form.duration} min</span>
                  </div>
                  {(lesson.domain || lesson.age) && (
                    <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
                      {lesson.domain && <span className="uppercase tracking-wide">{lesson.domain}</span>}
                      {lesson.domain && lesson.age && <span>·</span>}
                      {lesson.age && <span className="italic">{lesson.age}</span>}
                    </div>
                  )}
                  <CardTitle className="text-xl">
                    {lesson.title || <span className="text-gray-400">Rédaction du titre…</span>}
                  </CardTitle>
                </CardHeader>
              </Card>

              {streaming && (
                <div className="flex items-center gap-2 text-xs text-violet-600">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Rédaction en cours…
                </div>
              )}

              {lesson.objectives && lesson.objectives.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="h-4 w-4 text-violet-600" />
                      Objectifs pédagogiques
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {lesson.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {lesson.introduction && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 leading-relaxed">{lesson.introduction}</p>
                  </CardContent>
                </Card>
              )}

              {lesson.content && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Contenu de la leçon</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{lesson.content}</div>
                  </CardContent>
                </Card>
              )}

              {lesson.activities && lesson.activities.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      Activités
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {lesson.activities.map((activity, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          {activity}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              )}

              {lesson.materials && lesson.materials.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-green-600" />
                      Matériel nécessaire
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {lesson.materials.map((material, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{material}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {lesson.assessment && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-red-500" />
                      Évaluation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 leading-relaxed">{lesson.assessment}</p>
                  </CardContent>
                </Card>
              )}

              {lesson.tips && (
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-amber-800">Conseils pour l&apos;enseignant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-amber-800 leading-relaxed">{lesson.tips}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
