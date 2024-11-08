import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import SupportResponse from '#models/support_response'
import { createSupportResponseValidator } from '#validators/support_reponse'

export default class SupportResponseController {
  public create = async ({ auth, request, response }: HttpContext) => {
    try {
      const { message, supportId } = await request.validateUsing(createSupportResponseValidator)
      const { id: userId } = await auth.authenticate()
      const user = await User.findOrFail(userId)

      await SupportResponse.create({ message, userId: user.id, supportId })

      return response.created({
        message: 'Support response created successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }
}
