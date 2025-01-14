import { HttpContext } from '@adonisjs/core/http'
import DrugName from '#models/drug_name'
import { createDrugNameValidator, readAllDrugNameByDrugBrandIdValidator } from '#validators/drug_name'

export default class DrugNameController {
  public readAllByDrugBrandId = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const { drugBrandId } = await request.validateUsing(readAllDrugNameByDrugBrandIdValidator)

      return response.ok(
        await DrugName.query().where('drugBrandId', drugBrandId).preload('drugBrand')
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
      await auth.authenticate()
      const { name, drugBrandId } = await request.validateUsing(createDrugNameValidator)
     await DrugName.create({ name, drugBrandId })

      return response.created({
        message: 'Drug name created successfully',
      })
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
      const name = await DrugName.findOrFail(request.param('id'))

      await name.delete()

      return response.ok({
        message: 'Drug name deleted successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }
}
