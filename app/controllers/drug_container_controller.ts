import { HttpContext } from '@adonisjs/core/http'
import DrugContainer from '#models/drug_container'
import { createDrugContainerValidator } from '#validators/drug_container'

export default class DrugBrandController {
  public readAll = async ({ auth, response }: HttpContext) => {
    try {
      await auth.authenticate()

      return response.ok(await DrugContainer.all())
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public create = async ({ auth, request, response }: HttpContext) => {
    try {
      const { name } = await request.validateUsing(createDrugContainerValidator)
      await auth.authenticate()

      return response.created(await DrugContainer.create({ name }))
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
      const container = await DrugContainer.findOrFail(request.param('id'))

      await container.delete()

      return response.ok({
        message: 'Drug container deleted successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }
}
