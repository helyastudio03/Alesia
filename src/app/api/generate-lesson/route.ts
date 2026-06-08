import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic()

// La vision éducative d'Alesia, injectée comme prompt système.
// Chaque leçon générée doit s'inscrire dans cette cohérence d'ensemble.
const SYSTEM_PROMPT = `Tu es le moteur pédagogique d'Alesia, une plateforme d'instruction en famille (IEF) construite sur une vision éducative assumée. Tu ne produis pas des fiches scolaires génériques : tu conçois des leçons fidèles à une philosophie cohérente.

## La vision Alesia

Quatre principes fondateurs guident chaque leçon :

1. **L'individu complet** — Le corps et l'esprit se forment ensemble. Une bonne leçon ne mobilise pas seulement l'intellect : elle inclut, quand c'est pertinent, le geste, la manipulation, l'observation directe, l'effort physique. On forme un être capable d'agir dans le monde, pas seulement d'y réfléchir.

2. **Savoirs enracinés et pratiques** — Privilégie la densité réelle et l'ancrage dans la tradition intellectuelle européenne classique. Mathématiques rigoureuses, philosophie, langues anciennes, sciences naturelles observées de près, histoire, savoir-faire manuels. Cite les sources originales et les grands auteurs quand c'est pertinent (texte plutôt que résumé). Évite le pédagogisme creux et l'utilitarisme immédiat.

3. **L'autonomie réelle** — Le but n'est jamais l'obéissance ou la conformité, mais la compréhension. Chaque leçon doit développer le jugement propre de l'enfant, son initiative, et sa capacité à poursuivre l'apprentissage seul. Explique toujours le « pourquoi », pas seulement le « comment ».

4. **La méritocratie** — La progression suit la maîtrise réelle, pas l'âge ni le calendrier. L'évaluation mesure ce qui est véritablement acquis, sans complaisance ni nivellement par le bas. L'effort et l'excellence sont nommés et reconnus.

## Le curriculum en quatre domaines

- **Le Verbe** : latin, français, grammaire, logique, rhétorique, littérature, lecture des sources.
- **Le Nombre & les Formes** : arithmétique, géométrie (Euclide), algèbre, logique formelle, physique, astronomie.
- **Le Monde** : histoire, géographie physique, sciences naturelles, biologie, observation du vivant.
- **Le Corps & la Main** : éducation physique, savoir-faire manuels, dessin, musique, travail du bois, jardinage.
La **Sagesse** (philosophie, éthique, formation du jugement) irrigue les quatre domaines : elle en est la fin.

## La progression en trois âges

- **L'âge des faits** (fondations) : mémoire, observation, vocabulaire, récitation, socle factuel.
- **L'âge du raisonnement** (construction) : causes et effets, logique, démonstration, méthode, esprit critique discipliné.
- **L'âge de l'expression** (maîtrise) : rhétorique, création, jugement esthétique et moral, autonomie pleine.
Situe la leçon dans l'âge correspondant au niveau de l'enfant et adapte l'exigence en conséquence.

## Ta tâche

Tu génères un plan de leçon complet, rigoureux et cohérent avec cette vision, en français. Adapte le contenu, les exemples et le rythme à l'enfant décrit (niveau, style d'apprentissage, intérêts), sans jamais diluer l'exigence ni trahir la cohérence d'ensemble. Intègre une dimension pratique ou incarnée chaque fois que la matière le permet. Vise la maîtrise réelle, pas la simple couverture du programme.`

const LESSON_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'Titre sobre et digne de la leçon' },
    domain: {
      type: 'string',
      enum: ['Le Verbe', 'Le Nombre & les Formes', 'Le Monde', 'Le Corps & la Main'],
      description: "Le domaine du curriculum Alesia auquel la leçon se rattache",
    },
    age: {
      type: 'string',
      enum: ["L'âge des faits", 'Le raisonnement', "L'expression"],
      description: "L'âge de progression correspondant au niveau de l'enfant",
    },
    objectives: {
      type: 'array',
      items: { type: 'string' },
      description: 'Objectifs de maîtrise concrets et vérifiables',
    },
    introduction: { type: 'string', description: "Introduction qui capte l'attention et donne le sens de la leçon" },
    content: { type: 'string', description: 'Contenu détaillé, rigoureux, adapté au niveau' },
    activities: {
      type: 'array',
      items: { type: 'string' },
      description: 'Activités concrètes, incluant une dimension pratique/incarnée quand la matière le permet',
    },
    materials: { type: 'array', items: { type: 'string' }, description: 'Matériel nécessaire' },
    assessment: { type: 'string', description: 'Comment vérifier la maîtrise réelle de la leçon' },
    tips: { type: 'string', description: 'Conseils pour le parent qui transmet' },
  },
  required: [
    'title',
    'domain',
    'age',
    'objectives',
    'introduction',
    'content',
    'activities',
    'materials',
    'assessment',
    'tips',
  ],
  additionalProperties: false,
} as const

// Réponse d'erreur normalisée : un code stable que le client traduit en
// message clair pour le parent.
function errorResponse(code: string, status: number) {
  return NextResponse.json({ error: { code } }, { status })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { subject, gradeLevel, topic, duration, learningStyle, interests, additionalContext, domainHint, ageHint } = body

    if (!subject || !gradeLevel || !topic) {
      return errorResponse('missing_fields', 400)
    }

    // Sans clé API, inutile d'appeler le service : on le signale clairement.
    if (!process.env.ANTHROPIC_API_KEY) {
      return errorResponse('no_api_key', 503)
    }

    const userPrompt = `Conçois un plan de leçon Alesia avec ces paramètres :
- Matière : ${subject}
- Niveau scolaire : ${gradeLevel}
- Sujet / Thème : ${topic}
- Durée : ${duration} minutes
${learningStyle ? `- Style d'apprentissage : ${learningStyle}` : ''}
${interests ? `- Centres d'intérêt de l'enfant : ${interests}` : ''}
${additionalContext ? `- Contexte supplémentaire : ${additionalContext}` : ''}
${domainHint ? `- Domaine du curriculum (imposé) : ${domainHint}` : ''}
${ageHint ? `- Âge de progression (imposé) : ${ageHint}` : ''}

${domainHint || ageHint
  ? `Cette leçon appartient au tronc commun structuré : respecte impérativement le domaine et l'âge indiqués, et veille à la cohérence de l'exigence avec le niveau scolaire.`
  : `Rattache la leçon au bon domaine du curriculum et au bon âge de progression. Si le sujet demandé semble incohérent avec le niveau scolaire, adapte-le avec discernement pour rester pédagogiquement juste.`}
${interests ? `Intègre les centres d'intérêt de l'enfant (${interests}) dans les exemples et activités.` : ''}`

    const anthropicStream = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
      stream: true,
      output_config: {
        format: { type: 'json_schema', schema: LESSON_SCHEMA },
      },
    } as Anthropic.MessageCreateParamsStreaming)

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of anthropicStream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
        } catch (err) {
          console.error('Streaming error:', err)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('Error generating lesson:', error)
    // Traduit les erreurs du service en codes stables pour le client.
    if (error instanceof Anthropic.APIError) {
      if (error.status === 401) return errorResponse('invalid_api_key', 401)
      if (error.status === 429) return errorResponse('rate_limited', 429)
      if (error.status === 529 || error.status === 503) return errorResponse('overloaded', 503)
      if (typeof error.status === 'number' && error.status >= 500) return errorResponse('upstream', 502)
    }
    if (error instanceof Anthropic.APIConnectionError) {
      return errorResponse('connection', 502)
    }
    return errorResponse('unknown', 500)
  }
}
