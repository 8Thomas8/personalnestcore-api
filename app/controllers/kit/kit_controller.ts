import { HttpContext } from '@adonisjs/core/http'
import Kit from '#models/kit'
import { createKitValidator, updateKitValidator } from '#validators/kit/kit'

export default class KitController {
  public readAll = async ({ auth, response }: HttpContext) => {
    try {
      await auth.authenticate()

      return response.ok(await Kit.all())
    } catch (error) {
      return response.badRequest({
        message: 'Request failed',
        errors: error.messages,
      })
    }
  }

  public readOne = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const kit = await Kit.findOrFail(request.param('id'))

      return response.ok(kit)
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
      const { name } = await request.validateUsing(createKitValidator)

      return response.created(await Kit.create({ name, list: [] }))
    } catch (error) {
      return response.badRequest({
        message: 'Kit cannot be created',
        errors: error.messages,
      })
    }
  }

  public update = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const kit = await Kit.findOrFail(request.param('id'))
      const { name, list } = await request.validateUsing(updateKitValidator(request.param('id')))
      list.sort((a, b) => a.name.localeCompare(b.name))

      kit.merge({ name, list })

      await kit.save()

      return response.ok({
        message: 'Kit updated successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Kit cannot be updated',
        errors: error.messages,
      })
    }
  }

  public delete = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const kit = await Kit.findOrFail(request.param('id'))

      await kit.delete()

      return response.ok({
        message: 'Kit deleted successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Kit cannot be deleted',
        errors: error.messages,
      })
    }
  }
}
