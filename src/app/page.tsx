import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ backgroundColor: '#1a3a2a' }} className="py-32 px-4 text-center">
        <p style={{ color: '#b8962e', letterSpacing: '0.2em', fontSize: '0.75rem', fontWeight: 600 }} className="uppercase mb-6">
          Instruction en Famille
        </p>
        <h1
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f0e8', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1 }}
          className="mb-6"
        >
          Alesia
        </h1>
        <p style={{ color: '#f5f0e8', opacity: 0.8, fontFamily: "'Playfair Display', Georgia, serif" }} className="text-xl italic mb-12">
          Transmettre le savoir. Perpétuer la tradition.
        </p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <Link
            href="/enfants/nouveau"
            style={{ borderColor: '#b8962e', color: '#f5f0e8', border: '1px solid #b8962e' }}
            className="px-8 py-3 text-sm tracking-widest uppercase hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            Commencer
          </Link>
          <Link
            href="/generateur"
            style={{ color: '#f5f0e8', opacity: 0.7 }}
            className="px-8 py-3 text-sm tracking-widest uppercase hover:opacity-100 transition-opacity"
          >
            En savoir plus
          </Link>
        </div>
      </section>

      {/* Épigraphe */}
      <section style={{ backgroundColor: '#f5f0e8' }} className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1c1c', fontSize: '1.25rem' }}
            className="italic mb-6 leading-relaxed"
          >
            &ldquo;L&apos;éducation est l&apos;art de former les hommes, non de les informer.&rdquo;
          </p>
          <p style={{ color: '#8b7355', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
            — Émile Durkheim
          </p>
        </div>
      </section>

      {/* Notre philosophie */}
      <section style={{ backgroundColor: '#faf7f2' }} className="py-24 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div style={{ borderTop: '1px solid #b8962e' }} className="pt-8">
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a3a2a', fontSize: '1.75rem' }}
              className="mb-6"
            >
              Une éducation enracinée
            </h2>
            <p style={{ color: '#1c1c1c', lineHeight: 1.8, opacity: 0.85 }} className="text-base">
              L&apos;instruction que nous défendons ne se réduit pas à la transmission d&apos;informations. Elle est un acte de civilisation&nbsp;: former l&apos;enfant dans sa totalité, l&apos;enraciner dans l&apos;héritage de l&apos;Europe classique, lui donner les outils de la raison et la profondeur de l&apos;âme. Contre la fragmentation et la superficialité du monde moderne, nous proposons une éducation intégrale, fidèle à la tradition occidentale.
            </p>
          </div>
          <div style={{ borderTop: '1px solid #b8962e' }} className="pt-8">
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a3a2a', fontSize: '1.75rem' }}
              className="mb-6"
            >
              La méthode classique
            </h2>
            <p style={{ color: '#1c1c1c', lineHeight: 1.8, opacity: 0.85 }} className="text-base">
              Fondée sur le trivium — grammaire, rhétorique, dialectique — la méthode classique forme l&apos;esprit avant d&apos;accumuler les savoirs. L&apos;enfant apprend d&apos;abord à bien lire, à bien parler, à bien raisonner. Sur ce socle solide, les matières s&apos;édifient avec cohérence et profondeur. Chaque leçon est structurée, rigoureuse, et ancrée dans la continuité du patrimoine intellectuel européen.
            </p>
          </div>
        </div>
      </section>

      {/* Ce que nous offrons */}
      <section style={{ backgroundColor: '#f5f0e8' }} className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a3a2a', fontSize: '2rem', textAlign: 'center' }}
            className="mb-16"
          >
            Ce que nous offrons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Profils personnalisés',
                desc: "Chaque enfant est unique. Alesia permet de définir sa nature propre, son rythme, ses forces et ses inclinations — pour que l’enseignement soit adapté à ce qu’il est réellement.",
              },
              {
                title: 'Plans de leçons',
                desc: "Des plans structurés et rigoureux, organisés selon les principes de la pédagogie classique. Non des fiches vides, mais de véritables guides d’instruction.",
              },
              {
                title: 'Suivi de la formation',
                desc: "Suivre l’avancement de chaque enfant dans le temps, mesurer la profondeur acquise, ajuster la méthode sans jamais sacrifier l’exigence.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{ borderTop: '2px solid #b8962e', backgroundColor: '#faf7f2' }}
                className="p-8"
              >
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1c1c', fontSize: '1.125rem' }}
                  className="mb-4"
                >
                  {item.title}
                </h3>
                <p style={{ color: '#1c1c1c', opacity: 0.75, lineHeight: 1.8 }} className="text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À propos */}
      <section style={{ backgroundColor: '#1a3a2a' }} className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#b8962e', fontSize: '2rem' }}
            className="mb-8"
          >
            Qui sommes-nous
          </h2>
          <p style={{ color: '#f5f0e8', opacity: 0.85, lineHeight: 1.9 }} className="text-base">
            Alesia a été conçu par des parents pour des parents qui ont choisi de prendre en main l&apos;éducation de leurs enfants — loin de l&apos;influence niveleuse de l&apos;école moderne et de ses injonctions à l&apos;uniformité. Nous croyons que la vraie formation se transmet dans la proximité, dans la continuité, dans la fidélité à un héritage. Enracinés dans la tradition classique européenne, nous proposons un outil à la hauteur de cette ambition.
          </p>
        </div>
      </section>

      {/* Notre méthode */}
      <section style={{ backgroundColor: '#faf7f2' }} className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a3a2a', fontSize: '2rem', textAlign: 'center' }}
            className="mb-16"
          >
            Notre méthode
          </h2>
          <div className="space-y-12">
            {[
              {
                num: 'I',
                title: 'Connaître l’enfant',
                desc: "Comprendre sa nature, son rythme, ses forces. L’instruction commence par l’observation attentive de ce que l’enfant est — non de ce que l’on voudrait qu’il soit.",
              },
              {
                num: 'II',
                title: 'Choisir la matière',
                desc: "Sélectionner la discipline et l’approche avec discernement. Chaque matière est un domaine du savoir avec ses exigences propres et sa logique interne.",
              },
              {
                num: 'III',
                title: 'Recevoir la leçon',
                desc: "Un plan de leçon rigoureux et complet, structuré selon les principes classiques — avec ses objectifs, ses étapes, ses exercices et ses critères d’excellence.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-8" style={{ borderBottom: '1px solid #e8e0d0', paddingBottom: '3rem' }}>
                <div
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#b8962e', fontSize: '2rem', minWidth: '2.5rem', lineHeight: 1 }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a3a2a', fontSize: '1.25rem' }}
                    className="mb-3"
                  >
                    {step.title}
                  </h3>
                  <p style={{ color: '#1c1c1c', opacity: 0.75, lineHeight: 1.8 }} className="text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section style={{ backgroundColor: '#f5f0e8' }} className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a3a2a', fontSize: '2rem', textAlign: 'center' }}
            className="mb-16"
          >
            Témoignages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                quote: "Alesia a transformé notre quotidien. Mes enfants apprennent enfin avec profondeur.",
                author: "Marie, mère de 3 enfants",
              },
              {
                quote: "Un outil qui comprend ce que signifie vraiment instruire.",
                author: "Jean-François, père",
              },
            ].map((t) => (
              <div key={t.author} style={{ borderLeft: '2px solid #b8962e' }} className="pl-8">
                <p
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1c1c1c', fontSize: '1.125rem', lineHeight: 1.7 }}
                  className="italic mb-4"
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p style={{ color: '#8b7355', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                  — {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1c1c1c', color: '#f5f0e8' }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.5rem', color: '#f5f0e8' }}
            className="mb-8"
          >
            Alesia · IEF
          </p>
          <nav className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { href: '/', label: 'Accueil' },
              { href: '#philosophie', label: 'Philosophie' },
              { href: '/enfants', label: 'Enfants' },
              { href: '/lecons', label: 'Leçons' },
              { href: '/generateur', label: 'Générateur' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: '#f5f0e8', opacity: 0.6, fontSize: '0.8rem', letterSpacing: '0.1em' }}
                className="uppercase hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p style={{ color: '#8b7355', fontSize: '0.875rem', fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif" }} className="mb-6">
            L&apos;héritage se transmet, il ne s&apos;improvise pas.
          </p>
          <p style={{ color: '#f5f0e8', opacity: 0.3, fontSize: '0.75rem' }}>
            &copy; {new Date().getFullYear()} Alesia · Instruction en Famille
          </p>
        </div>
      </footer>
    </div>
  )
}
