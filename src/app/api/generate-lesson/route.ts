import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { subject, gradeLevel, topic, duration, learningStyle, interests, additionalContext } = body

    if (!subject || !gradeLevel || !topic) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const prompt = `Tu es un expert en pédagogie et en instruction en famille (IEF/homeschooling) en France. 
Crée un plan de leçon complet et détaillé pour un enfant français.

Paramètres de la leçon:
- Matière: ${subject}
- Niveau scolaire: ${gradeLevel}
- Sujet/Thème: ${topic}
- Durée: ${duration} minutes
${learningStyle ? `- Style d'apprentissage: ${learningStyle}` : ''}
${interests ? `- Centres d'intérêt de l'enfant: ${interests}` : ''}
${additionalContext ? `- Contexte: ${additionalContext}` : ''}

Génère un plan de leçon en français, adapté au niveau ${gradeLevel} et aux programmes scolaires français.
${interests ? `Intègre les centres d'intérêt de l'enfant (${interests}) dans les exemples et activités pour rendre la leçon plus engageante.` : ''}

Réponds UNIQUEMENT avec un objet JSON valide (sans markdown, sans backticks) avec cette structure exacte:
{
  "title": "Titre accrocheur de la leçon",
  "objectives": ["objectif 1", "objectif 2", "objectif 3"],
  "introduction": "Introduction engageante pour capter l'attention (2-3 phrases)",
  "content": "Contenu détaillé de la leçon avec explications claires et adaptées au niveau",
  "activities": ["Activité 1 détaillée", "Activité 2 détaillée", "Activité 3 détaillée"],
  "materials": ["matériel 1", "matériel 2", "matériel 3"],
  "assessment": "Description de comment évaluer la compréhension de l'enfant",
  "tips": "Conseils pratiques pour l'enseignant parent"
}`

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    let lesson
    try {
      lesson = JSON.parse(content.text.trim())
    } catch {
      // Try to extract JSON if wrapped in markdown
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        lesson = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Failed to parse lesson JSON')
      }
    }

    return NextResponse.json({ lesson })
  } catch (error) {
    console.error('Error generating lesson:', error)
    return NextResponse.json(
      { error: 'Failed to generate lesson' },
      { status: 500 }
    )
  }
}
