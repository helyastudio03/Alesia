import Link from 'next/link'
import { BookOpen, Users, Home, Sparkles, LogOut, LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/auth/actions'

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-violet-600" />
            <span className="text-xl font-bold text-gray-900">Alesia</span>
            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">IEF</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
            {user && (
              <>
                <Link href="/enfants" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                  <Users className="h-4 w-4" />
                  Enfants
                </Link>
                <Link href="/lecons" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                  <BookOpen className="h-4 w-4" />
                  Leçons
                </Link>
                <Link href="/generateur" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors ml-2">
                  <Sparkles className="h-4 w-4" />
                  Générer
                </Link>
                <form action={signOut} className="ml-2">
                  <button type="submit" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </button>
                </form>
              </>
            )}
            {!user && (
              <Link href="/auth/login" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors ml-2">
                <LogIn className="h-4 w-4" />
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
