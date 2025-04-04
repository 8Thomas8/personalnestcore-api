import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import { UserRole } from '../../types/constants.js'

export default class AuthController {
  public register = async ({ request, response }: HttpContext) => {
    try {
      const { username, password }: { username: string; password: string } =
        await request.validateUsing(registerUserValidator)

      const users = await User.query()

      if (users.length > 0) {
        return response.forbidden({
          message: 'Only the first user can register their account.',
        })
      }

      await User.create({ username, password, role: UserRole.Admin })

      return response.created({
        message: 'User created successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Registration failed',
      })
    }
  }

  login = async ({ request, response }: HttpContext) => {
    const { username, password }: { username: string; password: string } =
      await request.validateUsing(loginUserValidator)

    const user = await User.verifyCredentials(username, password)

    const token = await User.accessTokens.create(user)

    return response.created(token)
  }

  logout = async ({ auth, response }: HttpContext) => {
    const user = await auth.authenticate()

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.ok({ message: 'Logout success' })
  }

  public me = async ({ auth, response }: HttpContext) => {
    const user = await auth.authenticate()

    return response.json(user)
  }

  public adminCanRegister = async ({ response }: HttpContext) => {
    const users = await User.query()

    if (users.length > 0) {
      return response.ok(false)
    }

    return response.ok(true)
  }
}
