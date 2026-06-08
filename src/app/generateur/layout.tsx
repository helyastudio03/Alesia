export const metadata = {
  title: 'Composer une leçon',
  description:
    "Choisissez le niveau de l'enfant, sélectionnez un module du programme ou composez un cours libre. Une leçon complète et personnalisée se construit en quelques secondes.",
  openGraph: {
    title: 'Composer une leçon — Alesia',
    description: "Choisissez le niveau, sélectionnez un module du programme, composez. La méthode fait le reste.",
    images: [{ url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80', width: 1200, height: 630 }],
  },
}

export default function GenerateurLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
