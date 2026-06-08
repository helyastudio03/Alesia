'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { signOut } from '@/app/auth/actions'
import type { User } from '@supabase/supabase-js'

// Liens toujours visibles. Tant que l'authentification n'est pas configurée,
// l'ensemble de l'outil reste accessible — la navbar reflète le pied de page.
const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/methode', label: 'Méthode' },
  { href: '/programme', label: 'Programme' },
  { href: '/exemples', label: 'Exemples' },
  { href: '/faq', label: 'FAQ' },
  { href: '/enfants', label: 'Enfants' },
  { href: '/lecons', label: 'Leçons' },
  { href: '/generateur', label: 'Générateur' },
]

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Fermer le menu au changement de route.
  useEffect(() => { setOpen(false) }, [pathname])

  const allLinks = NAV_LINKS

  return (
    <>
      <nav
        style={{ backgroundColor: '#faf7f2', borderBottom: '1px solid #8b7355' }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1a3a2a', fontSize: '1.25rem', fontWeight: 700 }}
              >
                Alesia
              </span>
              <span style={{ color: '#8b7355', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                · IEF
              </span>
            </Link>

            {/* Liens desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(l => {
                const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    style={{ color: active ? '#1a3a2a' : '#1c1c1c', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                    className={`px-3 py-2 uppercase transition-all ${active ? 'underline underline-offset-4 decoration-gold' : 'hover:underline'}`}
                  >
                    {l.label}
                  </Link>
                )
              })}
              {user ? (
                <form action={signOut} className="ml-4">
                  <button
                    type="submit"
                    style={{ color: '#8b7355', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                    className="px-3 py-2 uppercase hover:underline transition-all"
                  >
                    Déconnexion
                  </button>
                </form>
              ) : (
                <Link
                  href="/auth/login"
                  style={{ color: '#1a3a2a', border: '1px solid #1a3a2a', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  className="px-4 py-2 uppercase ml-4 hover:bg-forest hover:bg-opacity-5 transition-colors"
                >
                  Connexion
                </Link>
              )}
            </div>

            {/* Bouton hamburger mobile */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setOpen(o => !o)}
              aria-label="Menu"
            >
              <span
                className="block w-6 h-px bg-charcoal transition-all duration-200"
                style={{ transform: open ? 'rotate(45deg) translate(2px, 3px)' : 'none' }}
              />
              <span
                className="block w-6 h-px bg-charcoal transition-all duration-200"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="block w-6 h-px bg-charcoal transition-all duration-200"
                style={{ transform: open ? 'rotate(-45deg) translate(2px, -3px)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Panneau mobile */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 flex flex-col"
          style={{ backgroundColor: '#faf7f2', top: '64px' }}
        >
          <div className="flex flex-col px-6 py-8 space-y-1">
            {allLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ color: '#1c1c1c', fontSize: '0.9rem', letterSpacing: '0.1em', fontFamily: "'Cormorant Garamond', serif" }}
                className="py-4 border-b border-stone/20 uppercase hover:text-forest transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-6">
              {user ? (
                <form action={signOut}>
                  <button
                    type="submit"
                    style={{ color: '#8b7355', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                    className="uppercase hover:underline transition-all"
                  >
                    Déconnexion
                  </button>
                </form>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  style={{ color: '#1a3a2a', border: '1px solid #1a3a2a', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  className="inline-block px-6 py-3 uppercase hover:bg-forest hover:text-cream transition-colors"
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
