import { HttpContext } from '@adonisjs/core/http'
import DrugBrand from '#models/drug_brand'
import { createDrugBrandValidator } from '#validators/drug_brand'

export default class DrugBrandController {
  public readAll = async ({ auth, response }: HttpContext) => {
    try {
      await auth.authenticate()

      return response.ok(
        await DrugBrand.all()
      )
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public create = async ({ auth, request, response }: HttpContext) => {
    try {
      const { name } = await request.validateUsing(createDrugBrandValidator)
      await auth.authenticate()


      return response.created( await DrugBrand.create({ name }))
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public delete = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const brand = await DrugBrand.findOrFail(request.param('id'))

      await brand.delete()

      return response.ok({
        message: 'Drug brand deleted successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }
}
