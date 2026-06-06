// Parse un JSON éventuellement incomplet (en cours de streaming).
// On complète à la volée les chaînes, tableaux et objets ouverts pour
// pouvoir afficher les champs déjà reçus avant la fin de la génération.
export function parsePartialJSON<T = unknown>(input: string): Partial<T> | null {
  const start = input.indexOf('{')
  if (start === -1) return null

  const text = input.slice(start)

  // Tentative directe (cas du JSON déjà complet).
  try {
    return JSON.parse(text) as T
  } catch {
    // on tente de réparer ci-dessous
  }

  const stack: string[] = []
  let inString = false
  let escaped = false
  let result = ''

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    result += ch

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (ch === '\\') {
        escaped = true
      } else if (ch === '"') {
        inString = false
      }
      continue
    }

    if (ch === '"') {
      inString = true
    } else if (ch === '{') {
      stack.push('}')
    } else if (ch === '[') {
      stack.push(']')
    } else if (ch === '}' || ch === ']') {
      stack.pop()
    }
  }

  // Si on s'est arrêté en plein échappement, on retire le backslash final.
  if (escaped) {
    result = result.slice(0, -1)
  }

  // Fermer une chaîne ouverte.
  if (inString) {
    result += '"'
  }

  // Retirer une virgule traînante avant fermeture.
  result = result.replace(/,\s*$/, '')

  // Retirer une clé partielle sans valeur (ex: `"content"` ou `"content":`).
  result = result.replace(/,?\s*"[^"]*"\s*:?\s*$/, '')

  // Fermer les conteneurs ouverts dans l'ordre.
  while (stack.length > 0) {
    result += stack.pop()
  }

  try {
    return JSON.parse(result) as T
  } catch {
    return null
  }
}
