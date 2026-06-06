import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/auth/actions'

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav
      style={{ backgroundColor: '#faf7f2', borderBottom: '1px solid #8b7355' }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1a3a2a', fontSize: '1.25rem', fontWeight: 700 }}
            >
              Alesia
            </span>
            <span style={{ color: '#8b7355', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              · IEF
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              style={{ color: '#1c1c1c', fontSize: '0.75rem', letterSpacing: '0.1em' }}
              className="px-3 py-2 uppercase hover:underline transition-all"
            >
              Accueil
            </Link>
            <Link
              href="/methode"
              style={{ color: '#1c1c1c', fontSize: '0.75rem', letterSpacing: '0.1em' }}
              className="px-3 py-2 uppercase hover:underline transition-all"
            >
              Méthode
            </Link>
            <Link
              href="/programme"
              style={{ color: '#1c1c1c', fontSize: '0.75rem', letterSpacing: '0.1em' }}
              className="px-3 py-2 uppercase hover:underline transition-all"
            >
              Programme
            </Link>
            <Link
              href="/exemples"
              style={{ color: '#1c1c1c', fontSize: '0.75rem', letterSpacing: '0.1em' }}
              className="px-3 py-2 uppercase hover:underline transition-all"
            >
              Exemples
            </Link>
            {user && (
              <>
                <Link
                  href="/enfants"
                  style={{ color: '#1c1c1c', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  className="px-3 py-2 uppercase hover:underline transition-all"
                >
                  Enfants
                </Link>
                <Link
                  href="/lecons"
                  style={{ color: '#1c1c1c', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  className="px-3 py-2 uppercase hover:underline transition-all"
                >
                  Leçons
                </Link>
                <Link
                  href="/generateur"
                  style={{ color: '#1c1c1c', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  className="px-3 py-2 uppercase hover:underline transition-all ml-2"
                >
                  Générateur
                </Link>
                <form action={signOut} className="ml-4">
                  <button
                    type="submit"
                    style={{ color: '#8b7355', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                    className="px-3 py-2 uppercase hover:underline transition-all"
                  >
                    Déconnexion
                  </button>
                </form>
              </>
            )}
            {!user && (
              <Link
                href="/auth/login"
                style={{ color: '#1a3a2a', border: '1px solid #1a3a2a', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                className="px-4 py-2 uppercase ml-4 hover:bg-forest hover:bg-opacity-5 transition-colors"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
