import { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#validators/user'
import { UserRole } from '../../types/constants.js'
import User from '#models/user'

export default class UserController {
  public readAll = async ({ auth, response }: HttpContext) => {
    const user = await auth.authenticate()

    const users = await User.query().where('id', '!=', user.id)

    return response.json(users)
  }

  public create = async ({ request, response, auth }: HttpContext) => {
    try {
      const { role } = await auth.authenticate()

      if (role !== UserRole.Admin) {
        return response.forbidden({
          message: 'Only administrators can add new users',
        })
      }

      const { email, password } = await request.validateUsing(createUserValidator)

      await User.create({ email, password })

      return response.created({
        message: 'New user created successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'New user cannot be created',
      })
    }
  }

  public update = async ({ auth, request, response }: HttpContext) => {
    try {
      const { id } = await auth.authenticate()

      const { email, password } = await request.validateUsing(updateUserValidator)

      const user = await User.findOrFail(request.param('id'))

      if (user.role === UserRole.Admin && id !== user.id) {
        return response.forbidden({
          message: 'Admin user cannot be updated by other users',
        })
      }

      user.merge({ email, password })

      await user.save()

      return response.ok({
        message: 'User updated successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'user cannot be updated',
        errors: error.messages,
      })
    }
  }

  public delete = async ({ auth, request, response }: HttpContext) => {
    try {
      const { role } = await auth.authenticate()

      if (role !== UserRole.Admin) {
        return response.forbidden({
          message: 'Only administrators can delete users',
        })
      }

      const user = await User.findOrFail(request.param('id'))

      await user.delete()

      return response.ok({
        message: 'User deleted successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'User cannot be deleted',
        errors: error.messages,
      })
    }
  }
}
