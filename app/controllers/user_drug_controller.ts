import { HttpContext } from '@adonisjs/core/http'
import UserDrug from '#models/user_drug'
import { createUserDrugValidator } from '#validators/user_drug'

export default class UserDrugController {
  public readAll = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()

      return response.ok(
        await UserDrug.query().preload('drugBrand').preload('drugName').paginate(request.input('page', 1), 20)
      )
    } catch (error) {
      console.log(error)
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public create = async ({ auth, request, response }: HttpContext) => {
    try {
      const { drugBrandId, drugNameId, unit, form, dose, expirationDateTime  } = await request.validateUsing(createUserDrugValidator)
      await auth.authenticate()

      await UserDrug.create({ drugBrandId, drugNameId, unit, form, dose, expirationDateTime })

      return response.created({
        message: 'User drug created successfully',
      })
    } catch (error) {
      console.log(error)
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public delete = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const userDrug = await UserDrug.findOrFail(request.param('id'))

      await userDrug.delete()

      return response.ok({
        message: 'User drug deleted successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }
}
