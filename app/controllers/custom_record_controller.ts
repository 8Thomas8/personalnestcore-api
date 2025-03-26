import { HttpContext } from '@adonisjs/core/http'
import CustomRecord from '#models/custom_record'
import {
  createCustomRecordValidator,
  updateCustomRecordValidator,
} from '#validators/custom-records/custom_records'

export default class CustomRecordController {
  public readAll = async ({ auth, response }: HttpContext) => {
    try {
      await auth.authenticate()

      return response.ok(await CustomRecord.all())
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
      const record = await CustomRecord.findOrFail(request.param('id'))

      return response.ok(record)
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
      const { name, view } = await request.validateUsing(createCustomRecordValidator)

      return response.created(await CustomRecord.create({ name, view }))
    } catch (error) {
      return response.badRequest({
        message: 'Record cannot be created',
        errors: error.messages,
      })
    }
  }

  public update = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const record = await CustomRecord.findOrFail(request.param('id'))
      const { name, view } = await request.validateUsing(updateCustomRecordValidator)

      record.merge({ name, view })

      await record.save()

      return response.ok({
        message: 'Record updated successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Record cannot be updated',
        errors: error.messages,
      })
    }
  }

  public delete = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const record = await CustomRecord.findOrFail(request.param('id'))

      await record.delete()

      return response.ok({
        message: 'Record deleted successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Record cannot be deleted',
        errors: error.messages,
      })
    }
  }
}
