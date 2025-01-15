import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUserValidator, registerUserValidator } from '#validators/auth'

export default class AuthController {
  public register = async ({ request, response }: HttpContext) => {
    try {
      const { email, password }: { email: string; password: string } =
        await request.validateUsing(registerUserValidator)

      await User.create({ email, password })

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
    const { email, password }: { email: string; password: string } =
      await request.validateUsing(loginUserValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return response.created(token)
  }

  logout = async ({ auth, response }: HttpContext) => {
    const user = await auth.authenticate()

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.ok({ message: 'Logout success' })
  }
}
