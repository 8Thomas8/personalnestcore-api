import { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  public me = async ({ auth, response }: HttpContext) => {
    const user = await auth.authenticate()

    return response.json(user)
  }
}
