'use client'

import { useState } from 'react'
import { useRouter, useParams, notFound } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { DOMAINS, type Domain } from '@/lib/curriculum'
import { Breadcrumb } from '@/components/breadcrumb'
import { getChild } from '@/lib/children'

const GRADE_LEVELS = [
  'CP', 'CE1', 'CE2', 'CM1', 'CM2',
  '6ème', '5ème', '4ème', '3ème',
  '2nde', '1ère', 'Terminale',
]

const LEARNING_STYLES = [
  { value: 'visuel', label: 'Visuel', desc: 'Apprend par les images, les schémas, les cartes' },
  { value: 'auditif', label: 'Auditif', desc: "Apprend par l'écoute, la récitation, la discussion" },
  { value: 'kinesthesique', label: 'Kinesthésique', desc: 'Apprend par la manipulation, le geste, l\'expérience' },
  { value: 'lecture', label: 'Lecture', desc: 'Apprend par les textes, la prise de notes, l\'écrit' },
]

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

export default function ModifierEnfantPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const child = getChild(params.id)
  if (!child) notFound()

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    first_name: child.first_name,
    grade_level: child.grade_level,
    learning_style: child.learning_style,
    notes: child.notes,
  })
  const [interests, setInterests] = useState<string[]>(child.interests)
  const [domains, setDomains] = useState<Domain[]>(child.domains)
  const [newInterest, setNewInterest] = useState('')

  const addInterest = () => {
    const val = newInterest.trim()
    if (val && !interests.includes(val)) {
      setInterests([...interests, val])
      setNewInterest('')
    }
  }

  const toggleDomain = (d: Domain) => {
    setDomains(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Persister les modifications via Supabase une fois le compte configuré.
    await new Promise(r => setTimeout(r, 800))
    router.push(`/enfants/${child.id}`)
  }

  const canSubmit = form.first_name && form.grade_level && !loading

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-12">

        <div className="mb-10">
          <Breadcrumb
            items={[
              { label: 'Mes enfants', href: '/enfants' },
              { label: child.first_name, href: `/enfants/${child.id}` },
              { label: 'Modifier' },
            ]}
          />
        </div>

        <div className="mb-10">
          <p className="text-gold tracking-[0.25em] text-xs uppercase mb-4">Modifier le profil</p>
          <h1 className="text-4xl font-light text-charcoal" style={GARAMOND}>
            {child.first_name}
          </h1>
          <div className="w-12 h-px bg-gold mt-4" />
        </div>

        {/* Note honnête sur la persistance tant que le compte n'est pas configuré */}
        <p className="text-charcoal/45 text-xs italic leading-relaxed border-l-2 border-gold/40 pl-4 mb-10" style={GARAMOND}>
          La sauvegarde des modifications sera disponible lorsque votre compte sera configuré.
        </p>

        <form onSubmit={handleSubmit} className="space-y-12">

          {/* IDENTITÉ */}
          <Section titre="Identité">
            <FieldGroup label="Prénom *">
              <Input
                value={form.first_name}
                onChange={e => setForm({ ...form, first_name: e.target.value })}
                placeholder="Prénom de l'enfant"
                required
                className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus-visible:ring-0 focus-visible:border-charcoal"
              />
            </FieldGroup>
            <FieldGroup label="Niveau actuel *">
              <Select value={form.grade_level} onValueChange={v => setForm({ ...form, grade_level: v })}>
                <SelectTrigger className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus:ring-0 focus:border-charcoal">
                  <SelectValue placeholder="Choisir le niveau" />
                </SelectTrigger>
                <SelectContent>
                  {GRADE_LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
              <p className="text-charcoal/40 text-xs mt-1.5">
                La progression Alesia suit la maîtrise, non le calendrier — ce niveau est un point de départ.
              </p>
            </FieldGroup>
          </Section>

          {/* DOMAINES EN TRAVAIL */}
          <Section titre="Domaines en travail" description="Quels domaines du curriculum abordez-vous pour le moment ? Plusieurs choix possibles.">
            <div className="grid grid-cols-1 gap-2">
              {DOMAINS.map((d, i) => {
                const chiffres = ['I', 'II', 'III', 'IV']
                const active = domains.includes(d)
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDomain(d)}
                    className={`w-full text-left p-4 border transition-colors flex items-center gap-4 ${
                      active ? 'border-charcoal bg-parchment' : 'border-stone/25 hover:border-stone/50'
                    }`}
                  >
                    <span
                      className="text-2xl text-gold/50 flex-shrink-0 w-8"
                      style={GARAMOND}
                    >
                      {chiffres[i]}
                    </span>
                    <span className="text-charcoal text-sm" style={GARAMOND}>{d}</span>
                    {active && <span className="ml-auto text-gold text-xs">✓</span>}
                  </button>
                )
              })}
            </div>
          </Section>

          {/* STYLE D'APPRENTISSAGE */}
          <Section titre="Comment apprend-il ?" description="Le style d'apprentissage dominant oriente les activités proposées dans chaque leçon.">
            <div className="grid grid-cols-1 gap-2">
              {LEARNING_STYLES.map(s => {
                const active = form.learning_style === s.value
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setForm({ ...form, learning_style: active ? '' : s.value })}
                    className={`w-full text-left p-4 border transition-colors ${
                      active ? 'border-charcoal bg-parchment' : 'border-stone/25 hover:border-stone/50'
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-charcoal text-sm" style={GARAMOND}>{s.label}</span>
                      {active && <span className="text-gold text-xs">✓</span>}
                    </div>
                    <p className="text-charcoal/45 text-xs mt-0.5">{s.desc}</p>
                  </button>
                )
              })}
            </div>
          </Section>

          {/* CENTRES D'INTÉRÊT */}
          <Section titre="Centres d'intérêt" description="Ces passions orienteront les exemples et les activités de chaque leçon.">
            <div className="flex gap-2 mb-3">
              <Input
                value={newInterest}
                onChange={e => setNewInterest(e.target.value)}
                placeholder="Ex : Astronomie, Chevaliers, Voile, Botanique…"
                className="border-stone/40 bg-cream text-charcoal rounded-none h-10 text-sm focus-visible:ring-0 focus-visible:border-charcoal"
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addInterest() } }}
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 border border-stone/40 text-charcoal/60 hover:border-charcoal hover:text-charcoal transition-colors text-lg leading-none"
              >
                +
              </button>
            </div>
            {interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {interests.map(interest => (
                  <span
                    key={interest}
                    className="flex items-center gap-2 text-xs text-charcoal/70 border border-stone/30 px-3 py-1"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => setInterests(interests.filter(i => i !== interest))}
                      className="text-stone/50 hover:text-charcoal transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Section>

          {/* NOTES */}
          <Section titre="Notes complémentaires" description="Forces, difficultés particulières, contexte — tout ce qui aide à mieux personnaliser.">
            <Textarea
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              placeholder="Ex : Excellente mémoire, difficultés en lecture, très attirée par les sciences naturelles, besoin de courtes séances…"
              rows={4}
              className="border-stone/40 bg-cream text-charcoal rounded-none text-sm focus-visible:ring-0 focus-visible:border-charcoal resize-none"
            />
          </Section>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-2 pb-10">
            <Link
              href={`/enfants/${child.id}`}
              className="flex-1 py-4 text-center border border-stone/40 text-charcoal/60 text-xs tracking-widest uppercase hover:border-charcoal hover:text-charcoal transition-all"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 py-4 border border-charcoal text-charcoal text-xs tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? 'Enregistrement…' : 'Enregistrer les modifications'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

function Section({
  titre,
  description,
  children,
}: {
  titre: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <div className="border-t border-stone/20 pt-8">
        <p className="text-gold tracking-[0.2em] text-xs uppercase mb-1">{titre}</p>
        {description && (
          <p className="text-charcoal/45 text-xs leading-relaxed mb-4">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-charcoal/50 tracking-widest uppercase mb-2">{label}</label>
      {children}
    </div>
  )
}
