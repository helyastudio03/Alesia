import Link from 'next/link'

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

export const metadata = {
  title: 'Page introuvable',
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-cream flex items-center justify-center px-6 py-20">
      <div className="max-w-lg text-center">
        <p className="text-gold tracking-[0.3em] text-xs uppercase mb-6">Erreur 404</p>
        <p className="text-7xl md:text-8xl text-forest mb-6" style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, letterSpacing: '0.05em' }}>
          IV
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-charcoal mb-6" style={GARAMOND}>
          Cette page n&apos;existe pas
        </h1>
        <div className="w-12 h-px bg-gold mx-auto mb-8" />
        <p className="text-charcoal/55 leading-relaxed mb-10" style={GARAMOND}>
          Le chemin que vous suivez ne mène nulle part. Revenez sur vos pas,
          ou reprenez le fil depuis l&apos;accueil.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-forest text-cream text-xs tracking-widest uppercase hover:bg-charcoal transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/programme"
            className="px-8 py-3 border border-stone/40 text-charcoal/60 text-xs tracking-widest uppercase hover:border-charcoal hover:text-charcoal transition-all"
          >
            Voir le programme
          </Link>
        </div>
      </div>
    </div>
  )
}
