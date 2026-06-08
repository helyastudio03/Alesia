'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { parsePartialJSON } from '@/lib/partial-json'
import { DOMAINS, LEVELS, modulesForLevel, CURRICULUM, type Module } from '@/lib/curriculum'
import { getChild, type Child } from '@/lib/children'

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

function GenerateurInner() {
  const [form, setForm] = useState({
    subject: '',
    gradeLevel: '',
    topic: '',
    duration: '45',
    learningStyle: '',
    interests: '',
    additionalContext: '',
    domainHint: '',
    ageHint: '',
  })
  const [mode, setMode] = useState<'programme' | 'libre'>('programme')
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeChild, setActiveChild] = useState<Child | null>(null)

  // Pré-remplir depuis l'URL :
  //  ?child=id    → contexte enfant (niveau, style, intérêts) venant de /enfants
  //  ?module=id   → module du tronc commun venant de /programme
  //  ?gradeLevel= → niveau seul (rétro-compatible)
  const searchParams = useSearchParams()
  useEffect(() => {
    const childId = searchParams.get('child')
    const moduleId = searchParams.get('module')
    const gradeLevel = searchParams.get('gradeLevel')

    const child = childId ? getChild(childId) : undefined
    if (child) {
      setActiveChild(child)
      setForm(f => ({
        ...f,
        gradeLevel: child.grade_level,
        learningStyle: child.learning_style,
        interests: f.interests || child.interests.join(', '),
      }))
    }

    if (moduleId) {
      const m = CURRICULUM.find(x => x.id === moduleId)
      if (!m) return
      setMode('programme')
      setSelectedModuleId(m.id)
      setForm(f => ({
        ...f,
        gradeLevel: child?.grade_level || f.gradeLevel || m.levels[0],
        subject: m.subject,
        topic: m.topic,
        domainHint: m.domain,
        ageHint: m.age,
      }))
    } else if (!child && gradeLevel && LEVELS.includes(gradeLevel as never)) {
      setForm(f => ({ ...f, gradeLevel }))
    }
  }, [searchParams])
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

  // Sélection d'un module du tronc commun : on remplit les paramètres
  // et on impose le domaine + l'âge pour garantir la cohérence.
  const selectModule = (m: Module) => {
    setSelectedModuleId(m.id)
    setForm(f => ({
      ...f,
      subject: m.subject,
      topic: m.topic,
      domainHint: m.domain,
      ageHint: m.age,
    }))
  }

  const switchMode = (next: 'programme' | 'libre') => {
    setMode(next)
    setSelectedModuleId(null)
    // En mode libre, on n'impose ni domaine ni âge.
    setForm(f => ({ ...f, subject: '', topic: '', domainHint: '', ageHint: '' }))
  }

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

  const canGenerate = !loading && form.gradeLevel && (
    mode === 'programme'
      ? !!selectedModuleId
      : !!(form.subject && form.topic)
  )

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
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-6 font-light">La méthode en pratique</p>
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

      {/* Bandeau contextuel — composition pour un enfant précis */}
      {activeChild && (
        <div className="bg-forest/5 border-b border-stone/15 no-print">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-charcoal/70 text-sm" style={GARAMOND}>
              Vous composez pour{' '}
              <Link
                href={`/enfants/${activeChild.id}`}
                className="text-forest font-medium underline underline-offset-2 hover:text-charcoal transition-colors"
              >
                {activeChild.first_name}
              </Link>
              {' '}· {activeChild.grade_level} · niveau et centres d&apos;intérêt pré-remplis.
            </p>
            <button
              onClick={() => setActiveChild(null)}
              className="text-stone/60 text-xs tracking-widest uppercase hover:text-charcoal transition-colors flex-shrink-0"
            >
              Retirer ✕
            </button>
          </div>
        </div>
      )}

      {/* FORMULAIRE + RÉSULTAT */}
      <section className="py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* — Colonne formulaire */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              {/* Niveau de l'enfant — porte d'entrée */}
              <FieldGroup label="Niveau de l'enfant *" className="mb-6">
                <Select
                  value={form.gradeLevel}
                  onValueChange={v => { setForm({ ...form, gradeLevel: v }); setSelectedModuleId(null) }}
                >
                  <SelectTrigger className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus:ring-0 focus:border-charcoal">
                    <SelectValue placeholder="Choisir le niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADE_LEVELS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FieldGroup>

              {/* Bascule de mode */}
              <div className="flex border border-stone/30 mb-6">
                <button
                  onClick={() => switchMode('programme')}
                  className={`flex-1 py-3 text-xs tracking-widest uppercase transition-colors ${
                    mode === 'programme' ? 'bg-forest text-cream' : 'text-charcoal/50 hover:text-charcoal'
                  }`}
                >
                  Le programme
                </button>
                <button
                  onClick={() => switchMode('libre')}
                  className={`flex-1 py-3 text-xs tracking-widest uppercase transition-colors border-l border-stone/30 ${
                    mode === 'libre' ? 'bg-forest text-cream' : 'text-charcoal/50 hover:text-charcoal'
                  }`}
                >
                  Cours personnalisé
                </button>
              </div>

              {/* MODE PROGRAMME — tronc commun structuré */}
              {mode === 'programme' && (
                <div className="mb-2">
                  {!form.gradeLevel && (
                    <p className="text-charcoal/40 text-sm italic leading-relaxed" style={GARAMOND}>
                      Choisissez d&apos;abord le niveau de l&apos;enfant pour découvrir
                      les modules du tronc commun qui lui correspondent.
                    </p>
                  )}
                  {form.gradeLevel && (() => {
                    const grouped = modulesForLevel(form.gradeLevel)
                    const total = DOMAINS.reduce((n, d) => n + grouped[d].length, 0)
                    if (total === 0) {
                      return (
                        <div className="border border-dashed border-stone/30 p-5 text-center">
                          <p className="text-charcoal/45 text-sm italic leading-relaxed mb-3" style={GARAMOND}>
                            Le programme ne contient pas encore de modules pour ce niveau.
                          </p>
                          <button
                            onClick={() => switchMode('libre')}
                            className="text-xs text-forest underline underline-offset-2 hover:text-charcoal transition-colors"
                          >
                            Passer au cours personnalisé →
                          </button>
                        </div>
                      )
                    }
                    return (
                      <div className="space-y-6">
                        <p className="text-charcoal/35 text-xs">
                          {total} module{total > 1 ? 's' : ''} disponible{total > 1 ? 's' : ''} pour ce niveau
                          {selectedModuleId ? ' · 1 sélectionné' : ' · Cliquez pour sélectionner'}
                        </p>
                        {DOMAINS.map(domain => {
                          const mods = grouped[domain]
                          if (mods.length === 0) return null
                          return (
                            <div key={domain}>
                              <p className="text-gold tracking-[0.2em] text-xs uppercase mb-3">{domain}</p>
                              <div className="space-y-2">
                                {mods.map(m => {
                                  const active = selectedModuleId === m.id
                                  return (
                                    <button
                                      key={m.id}
                                      onClick={() => selectModule(m)}
                                      className={`w-full text-left p-3 border transition-colors ${
                                        active
                                          ? 'border-charcoal bg-parchment'
                                          : 'border-stone/25 hover:border-stone/60'
                                      }`}
                                    >
                                      <div className="flex items-baseline justify-between gap-2">
                                        <span className="text-charcoal text-sm" style={GARAMOND}>
                                          {m.title}
                                        </span>
                                        <span className="text-stone/60 text-[0.65rem] uppercase tracking-wider flex-shrink-0">
                                          {m.subject}
                                        </span>
                                      </div>
                                      <p className="text-charcoal/45 text-xs mt-1 leading-snug">{m.topic}</p>
                                      {active && (
                                        <p className="text-gold/70 text-[0.65rem] mt-1.5 tracking-wider uppercase">
                                          Sélectionné ✓
                                        </p>
                                      )}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* MODE LIBRE — cours personnalisé */}
              {mode === 'libre' && (
                <div>
                  <p className="text-charcoal/45 text-xs italic mb-5 leading-relaxed">
                    En complément du programme : composez une leçon sur un sujet de votre choix.
                    Elle sera rattachée au domaine et à l&apos;âge cohérents.
                  </p>
                  <FieldGroup label="Matière *" className="mb-4">
                    <Select value={form.subject} onValueChange={v => setForm({ ...form, subject: v })}>
                      <SelectTrigger className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus:ring-0 focus:border-charcoal">
                        <SelectValue placeholder="Choisir une matière" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FieldGroup>
                  <FieldGroup label="Sujet / Thème *">
                    <Input
                      value={form.topic}
                      onChange={e => setForm({ ...form, topic: e.target.value })}
                      placeholder="Ex : La Révolution française, les fractions…"
                      className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus-visible:ring-0 focus-visible:border-charcoal"
                    />
                  </FieldGroup>
                </div>
              )}

              <div className="my-6 border-t border-stone/20" />

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
                  placeholder="Ex : Astronomie, Chevaliers, Voile, Botanique"
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

            {/* Aide contextuelle selon l'état */}
            {!loading && !canGenerate && (
              <p className="text-charcoal/35 text-xs italic text-center -mb-2" style={GARAMOND}>
                {!form.gradeLevel
                  ? 'Choisissez le niveau pour commencer.'
                  : mode === 'programme' && !selectedModuleId
                  ? 'Sélectionnez un module dans le programme.'
                  : mode === 'libre' && !form.topic
                  ? 'Renseignez le sujet de la leçon.'
                  : ''}
              </p>
            )}

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
              <div className="h-full min-h-[240px] lg:min-h-[400px] flex flex-col items-center justify-center border border-dashed border-stone/30 p-8 md:p-12">
                <div className="text-5xl text-gold/30 mb-6" style={GARAMOND}>✦</div>
                <p className="text-charcoal/40 text-sm tracking-widest uppercase text-center">
                  La leçon apparaîtra ici
                </p>
                <p className="text-charcoal/30 text-xs mt-2 text-center max-w-xs leading-relaxed">
                  Choisissez le niveau, puis un module du programme — ou composez un cours personnalisé.
                </p>
              </div>
            )}

            {loading && !lesson && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-dashed border-stone/30 p-12">
                <div className="w-8 h-8 border border-gold/40 border-t-gold animate-spin rounded-full mb-6" />
                <p className="text-charcoal/50 text-sm tracking-widest uppercase">
                  La leçon se compose…
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

export default function GenerateurPage() {
  return (
    <Suspense fallback={<div className="bg-cream min-h-screen" />}>
      <GenerateurInner />
    </Suspense>
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
