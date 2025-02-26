import type { HttpContext } from '@adonisjs/core/http'
import sanitizeHtml from 'sanitize-html'

export default class SanitizeInputMiddleware {
  public async handle({ request }: HttpContext, next: () => Promise<void>) {
    if (!['POST', 'PUT', 'PATCH'].includes(request.method())) {
      return await next()
    }

    const sanitize = (input: any): any => {
      if (typeof input === 'string') {
        return sanitizeHtml(input, {
          allowedTags: [], // Aucune balise autorisée
          allowedAttributes: {},
          textFilter: (text) => text.trim(), // Assure que seul du texte brut reste
        })
      } else if (Array.isArray(input)) {
        return input.map(sanitize)
      } else if (typeof input === 'object' && input !== null) {
        return Object.fromEntries(
          Object.entries(input).map(([key, value]) => [key, sanitize(value)])
        )
      }
      return input
    }

    const sanitizedData = sanitize(request.all())
    request.updateBody(sanitizedData)

    await next()
  }
}
