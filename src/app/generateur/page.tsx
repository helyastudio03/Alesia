'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
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

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

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
  const [loading, setLoading] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [lesson, setLesson] = useState<Partial<LessonResult> | null>(null)
  const [error, setError] = useState<string | null>(null)
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
      if (!response.ok || !response.body) throw new Error()
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        const partial = parsePartialJSON<LessonResult>(accumulated)
        if (partial) { setLesson(partial); setStreaming(true) }
      }
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
    <div className="bg-cream">

      {/* HERO */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80"
          alt="Plume sur parchemin"
          fill
          className="object-cover object-center grayscale"
          priority
        />
        <div className="absolute inset-0 bg-forest/82" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-6 font-light">Moteur pédagogique</p>
          <h1
            className="text-5xl md:text-6xl font-light text-cream mb-6"
            style={{ ...GARAMOND, letterSpacing: '-0.01em' }}
          >
            Générer une leçon
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-cream/75 text-lg font-light italic" style={GARAMOND}>
            Décrivez l&apos;enfant et le sujet. La méthode fait le reste.
          </p>
        </div>
      </section>

      {/* FORMULAIRE + RÉSULTAT */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* — Colonne formulaire */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-gold tracking-[0.25em] text-xs uppercase mb-6">Paramètres</p>

              {/* Matière + Niveau */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FieldGroup label="Matière *">
                  <Select value={form.subject} onValueChange={v => setForm({ ...form, subject: v })}>
                    <SelectTrigger className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus:ring-0 focus:border-charcoal">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Niveau *">
                  <Select value={form.gradeLevel} onValueChange={v => setForm({ ...form, gradeLevel: v })}>
                    <SelectTrigger className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus:ring-0 focus:border-charcoal">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADE_LEVELS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>

              <FieldGroup label="Sujet / Thème *" className="mb-4">
                <Input
                  value={form.topic}
                  onChange={e => setForm({ ...form, topic: e.target.value })}
                  placeholder="Ex : La Révolution française, les fractions…"
                  className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus-visible:ring-0 focus-visible:border-charcoal"
                />
              </FieldGroup>

              <FieldGroup label="Durée" className="mb-4">
                <Select value={form.duration} onValueChange={v => setForm({ ...form, duration: v })}>
                  <SelectTrigger className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus:ring-0 focus:border-charcoal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATIONS.map(d => <SelectItem key={d} value={d}>{d} minutes</SelectItem>)}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <div className="my-6 border-t border-stone/20" />

              <FieldGroup label="Style d'apprentissage" className="mb-4">
                <Select value={form.learningStyle} onValueChange={v => setForm({ ...form, learningStyle: v })}>
                  <SelectTrigger className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus:ring-0 focus:border-charcoal">
                    <SelectValue placeholder="Optionnel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visuel">Visuel</SelectItem>
                    <SelectItem value="auditif">Auditif</SelectItem>
                    <SelectItem value="kinesthesique">Kinesthésique</SelectItem>
                    <SelectItem value="lecture">Lecture / Écriture</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup label="Centres d'intérêt de l'enfant" className="mb-4">
                <Input
                  value={form.interests}
                  onChange={e => setForm({ ...form, interests: e.target.value })}
                  placeholder="Ex : Dinosaures, Football, Minecraft"
                  className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus-visible:ring-0 focus-visible:border-charcoal"
                />
              </FieldGroup>

              <FieldGroup label="Contexte supplémentaire">
                <Textarea
                  value={form.additionalContext}
                  onChange={e => setForm({ ...form, additionalContext: e.target.value })}
                  placeholder="Difficultés particulières, objectifs spécifiques, matériel disponible…"
                  rows={3}
                  className="border-stone/40 bg-cream text-charcoal rounded-none text-sm focus-visible:ring-0 focus-visible:border-charcoal resize-none"
                />
              </FieldGroup>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full py-4 border border-charcoal text-charcoal text-sm tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? 'Rédaction en cours…' : 'Composer la leçon'}
            </button>

            {error && (
              <p className="text-sm text-burgundy border-l-2 border-burgundy pl-4 leading-relaxed">
                {error}
              </p>
            )}
          </div>

          {/* — Colonne résultat */}
          <div className="lg:col-span-3">
            {!lesson && !loading && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-dashed border-stone/30 p-12">
                <div className="text-5xl text-gold/30 mb-6" style={GARAMOND}>✦</div>
                <p className="text-charcoal/40 text-sm tracking-widest uppercase text-center">
                  La leçon apparaîtra ici
                </p>
                <p className="text-charcoal/30 text-xs mt-2 text-center max-w-xs leading-relaxed">
                  Renseignez la matière, le niveau et le sujet, puis composez.
                </p>
              </div>
            )}

            {loading && !lesson && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-dashed border-stone/30 p-12">
                <div className="w-8 h-8 border border-gold/40 border-t-gold animate-spin rounded-full mb-6" />
                <p className="text-charcoal/50 text-sm tracking-widest uppercase">
                  Le moteur compose…
                </p>
              </div>
            )}

            {lesson && (
              <div id="lesson-print" className="space-y-0">

                {/* En-tête de la leçon */}
                <div className="bg-forest text-cream p-8 md:p-10">
                  <div className="flex items-center justify-between gap-4 mb-4 no-print">
                    <div className="flex flex-wrap items-center gap-3">
                      {form.subject && (
                        <span className="text-gold text-xs tracking-[0.2em] uppercase">{form.subject}</span>
                      )}
                      {form.gradeLevel && (
                        <>
                          <span className="text-cream/30">·</span>
                          <span className="text-cream/60 text-xs">{form.gradeLevel}</span>
                        </>
                      )}
                      {form.duration && (
                        <>
                          <span className="text-cream/30">·</span>
                          <span className="text-cream/60 text-xs">{form.duration} min</span>
                        </>
                      )}
                      {streaming && (
                        <>
                          <span className="text-cream/30">·</span>
                          <span className="text-gold/70 text-xs italic">rédaction en cours…</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={copyLesson}
                        className="text-xs text-cream/50 hover:text-gold tracking-widest uppercase transition-colors px-2 py-1 border border-cream/20 hover:border-gold/50"
                      >
                        {copied ? '✓ Copié' : 'Copier'}
                      </button>
                      <button
                        onClick={printLesson}
                        className="text-xs text-cream/50 hover:text-gold tracking-widest uppercase transition-colors px-2 py-1 border border-cream/20 hover:border-gold/50"
                      >
                        Imprimer
                      </button>
                    </div>
                  </div>

                  {(lesson.domain || lesson.age) && (
                    <div className="flex items-center gap-2 mb-3 text-xs text-gold/70 uppercase tracking-widest">
                      {lesson.domain && <span>{lesson.domain}</span>}
                      {lesson.domain && lesson.age && <span className="text-gold/30">·</span>}
                      {lesson.age && <span className="italic normal-case tracking-normal text-cream/50">{lesson.age}</span>}
                    </div>
                  )}

                  <h2 className="text-3xl md:text-4xl font-light leading-snug" style={GARAMOND}>
                    {lesson.title || <span className="text-cream/40 italic">Titre en cours…</span>}
                  </h2>
                </div>

                {/* Corps de la leçon */}
                <div className="divide-y divide-stone/15">

                  {lesson.objectives && lesson.objectives.length > 0 && (
                    <Bloc titre="Objectifs de maîtrise">
                      <ul className="space-y-3">
                        {lesson.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-3 text-charcoal/70 leading-relaxed">
                            <span className="text-gold mt-1.5 text-xs flex-shrink-0">◆</span>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </Bloc>
                  )}

                  {lesson.introduction && (
                    <Bloc titre="Introduction">
                      <p className="text-charcoal/70 leading-relaxed italic" style={GARAMOND}>
                        {lesson.introduction}
                      </p>
                    </Bloc>
                  )}

                  {lesson.content && (
                    <Bloc titre="Déroulé de la leçon">
                      <div className="text-charcoal/70 leading-relaxed whitespace-pre-wrap">
                        {lesson.content}
                      </div>
                    </Bloc>
                  )}

                  {lesson.activities && lesson.activities.length > 0 && (
                    <Bloc titre="Activités">
                      <ol className="space-y-4">
                        {lesson.activities.map((activity, i) => (
                          <li key={i} className="flex gap-4 text-charcoal/70 leading-relaxed">
                            <span
                              className="text-gold/60 flex-shrink-0 text-lg"
                              style={GARAMOND}
                            >
                              {i + 1}.
                            </span>
                            {activity}
                          </li>
                        ))}
                      </ol>
                    </Bloc>
                  )}

                  {lesson.materials && lesson.materials.length > 0 && (
                    <Bloc titre="Matériel nécessaire">
                      <div className="flex flex-wrap gap-2">
                        {lesson.materials.map((material, i) => (
                          <span
                            key={i}
                            className="text-xs text-charcoal/60 border border-stone/30 px-3 py-1"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </Bloc>
                  )}

                  {lesson.assessment && (
                    <Bloc titre="Évaluation de la maîtrise">
                      <p className="text-charcoal/70 leading-relaxed">{lesson.assessment}</p>
                    </Bloc>
                  )}

                  {lesson.tips && (
                    <div className="p-8 md:p-10 bg-parchment">
                      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-4">Conseils pour le parent</p>
                      <p className="text-charcoal/70 leading-relaxed italic" style={GARAMOND}>
                        {lesson.tips}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function Bloc({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="p-8 md:p-10">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-4">{titre}</p>
      {children}
    </div>
  )
}

function FieldGroup({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-xs text-charcoal/50 tracking-widest uppercase mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}
