import { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs/promises'
import { join } from 'node:path'

export default class AppController {
  public getVersion = async ({ response }: HttpContext) => {
    try {
      const jsonPath = join(process.cwd(), 'resources/version.json')
      const data = await fs.readFile(jsonPath, 'utf-8')
      response.header('Cache-Control', 'no-cache, no-store, must-revalidate')
      response.header('Pragma', 'no-cache')
      response.header('Expires', '0')
      return response.ok(JSON.parse(data))
    } catch (error) {
      return response.internalServerError({ error: 'Failed to load JSON' })
    }
  }
}
