import Link from 'next/link'

const GARAMOND = { fontFamily: "'Cormorant Garamond', serif" }

export type Crumb = { label: string; href?: string }

// Fil d'Ariane cohérent placé sous le hero des pages internes.
// Le dernier élément représente la page courante (sans lien).
export function Breadcrumb({ items, className = '' }: { items: Crumb[]; className?: string }) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`flex flex-wrap items-center gap-2 text-xs tracking-widest uppercase no-print ${className}`}
    >
      <Link
        href="/"
        className="text-stone/55 hover:text-charcoal transition-colors"
      >
        Accueil
      </Link>
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-2">
            <span className="text-stone/30" aria-hidden>·</span>
            {last || !item.href ? (
              <span className="text-charcoal/70" style={GARAMOND} aria-current={last ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-stone/55 hover:text-charcoal transition-colors">
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
