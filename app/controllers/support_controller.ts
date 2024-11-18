import { HttpContext } from '@adonisjs/core/http'
import { createSupportValidator, updateSupportValidator } from '#validators/support'
import Support from '#models/support'
import { UserRole } from '#models/user'

export default class SupportController {
  public create = async ({ auth, request, response }: HttpContext) => {
    try {
      const { message, status } = await request.validateUsing(createSupportValidator)
      const { id: userId, role: userRole } = await auth.authenticate()

      if (userRole === UserRole.Admin) {
        return response.unauthorized({
          message: "You don't have permission to create a request",
        })
      }

      await Support.create({ message, status, userId: userId })

      return response.created({
        message: 'Support request created successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public update = async ({ params, auth, request, response }: HttpContext) => {
    try {
      const support = await Support.findOrFail(params.id)
      const { status } = await request.validateUsing(updateSupportValidator)
      const {role: userRole} = await auth.authenticate()

      if (userRole !== UserRole.Admin) {
        return response.unauthorized({
          message: "You don't have permission to update this support request",
        })
      }

      await support.merge({ status }).save()

      return response.ok({
        message: 'Support request updated successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public readAll = async ({ auth, request, response }: HttpContext) => {
    try {
      const { id: userId, role: userRole } = await auth.authenticate()

      if (userRole === UserRole.Admin) {
        return response.ok(await Support.query().paginate(request.input('page', 1), 20))
      }

      return response.ok(
        await Support.query().where('user_id', userId).paginate(request.input('page', 1), 20)
      )
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public readOne = async ({ auth, params, response }: HttpContext) => {
    try {
      const { id: userId, role: userRole } = await auth.authenticate()
      const support = await Support.findOrFail(params.id)

      if (userRole !== UserRole.Admin && support.userId !== userId) {
        return response.unauthorized({ message: "You don't own this data" })
      }

      await support.load('user')
      await support.load('supportResponses', (query) => {
        query.preload('user')
      })

      return response.ok([support])
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }
}
