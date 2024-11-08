import { HttpContext } from '@adonisjs/core/http'
import { createSupportValidator, updateSupportValidator } from '#validators/support'
import Support from '#models/support'
import User, { UserRole } from '#models/user'

export default class SupportController {
  public create = async ({ auth, request, response }: HttpContext) => {
    try {
      const { message, status } = await request.validateUsing(createSupportValidator)
      const { id: userId } = await auth.authenticate()
      const user = await User.findOrFail(userId)

      await Support.create({ message, status, userId: user.id })

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
      const user = await auth.authenticate()

      if (user.role !== UserRole.Admin) {
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
      const user = await auth.authenticate()

      if (user.role === UserRole.Admin) {
        return response.ok(await Support.query().paginate(request.input('page', 1), 20))
      }

      return response.ok(
        await Support.query().where('user_id', user.id).paginate(request.input('page', 1), 20)
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
      const { id: userId } = await auth.authenticate()
      const support = await Support.findOrFail(params.id)

      if (support.userId !== userId) {
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
