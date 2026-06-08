'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn, signInWithGoogle } from '../actions'

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    await signInWithGoogle()
    setGoogleLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="text-4xl text-forest" style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, letterSpacing: '0.08em' }}>
              Alesia
            </span>
          </Link>
          <p className="text-gold tracking-[0.3em] text-xs uppercase mt-4">Votre espace</p>
        </div>

        <div className="border border-stone/25 bg-parchment p-8 md:p-10">
          <h1 className="text-3xl font-light text-charcoal text-center mb-2" style={GARAMOND}>
            Connexion
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 border border-stone/40 text-charcoal/70 text-xs tracking-widest uppercase hover:border-charcoal hover:text-charcoal transition-colors disabled:opacity-40"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {googleLoading ? 'Connexion…' : 'Continuer avec Google'}
          </button>

          <div className="flex items-center gap-4 my-6">
            <span className="flex-1 h-px bg-stone/25" />
            <span className="text-stone/50 text-xs uppercase tracking-widest">ou</span>
            <span className="flex-1 h-px bg-stone/25" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Email">
              <input
                name="email"
                type="email"
                placeholder="vous@exemple.fr"
                required
                className="w-full border border-stone/40 bg-cream text-charcoal h-10 px-3 text-sm focus:outline-none focus:border-charcoal"
              />
            </Field>
            <Field label="Mot de passe">
              <input
                name="password"
                type="password"
                required
                className="w-full border border-stone/40 bg-cream text-charcoal h-10 px-3 text-sm focus:outline-none focus:border-charcoal"
              />
            </Field>

            {error && (
              <p className="text-sm text-burgundy border-l-2 border-burgundy pl-4 leading-relaxed">
                {error === 'Invalid login credentials' ? 'Email ou mot de passe incorrect.' : error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-forest text-cream text-xs tracking-widest uppercase hover:bg-charcoal transition-colors disabled:opacity-40"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>

          <p className="text-center text-sm text-charcoal/50 mt-8" style={GARAMOND}>
            Pas encore de compte ?{' '}
            <Link href="/auth/signup" className="text-forest underline underline-offset-2 hover:text-charcoal transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-charcoal/50 tracking-widest uppercase mb-2">{label}</label>
      {children}
    </div>
  )
}
