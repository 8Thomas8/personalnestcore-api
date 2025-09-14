import { HttpContext } from '@adonisjs/core/http'
import {
  createCustomRecordDataValidator,
  updateCustomRecordDataValidator,
} from '#validators/custom-records/custom_record_data'
import CustomRecordData from '#models/custom_record_data'
import { DateTime } from 'luxon'
import CustomRecord from '#models/custom_record'

export default class CustomRecordDataController {
  public readAllByCustomRecordId = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()

      const { itemPerPage, startDate, endDate } = request.qs()
      const customRecordId = request.param('custom-record-id')

      const customRecord = await CustomRecord.find(customRecordId)
      if (!customRecord) {
        return response.notFound({
          message: 'The specified Custom Record does not exist',
        })
      }

      const query = CustomRecordData.query().where('customRecordId', customRecordId)

      const defaultStartDate = DateTime.now().minus({ months: 1 })
      const defaultEndDate = DateTime.now()
      const isoStartDate = startDate
        ? DateTime.fromFormat(startDate, 'dd/MM/yyyy').toUTC().startOf('day').toISO()
        : defaultStartDate.startOf('day').toISO()
      const isoEndDate = endDate
        ? DateTime.fromFormat(endDate, 'dd/MM/yyyy').toUTC().endOf('day').toISO()
        : defaultEndDate.endOf('day').toISO()

      if (!isoStartDate || !isoEndDate) {
        return response.badRequest({
          message: 'Invalid date format',
        })
      }

      await query
        .whereRaw('DATE(datetime) >= DATE(?)', [isoStartDate])
        .whereRaw('DATE(datetime) <= DATE(?)', [isoEndDate])

      return response.ok(await query.paginate(request.input('page', 1), itemPerPage ?? 20))
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

      const customRecordId = request.param('custom-record-id')

      const customRecord = await CustomRecord.find(customRecordId)
      if (!customRecord) {
        return response.notFound({
          message: 'The specified Custom Record does not exist',
        })
      }

      const { content, datetime } = await request.validateUsing(createCustomRecordDataValidator)

      return response.created(await CustomRecordData.create({ content, datetime, customRecordId }))
    } catch (error) {
      return response.badRequest({
        message: 'Record data cannot be created',
        errors: error.messages,
      })
    }
  }

  public update = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const record = await CustomRecordData.findOrFail(request.param('id'))
      const { content, datetime } = await request.validateUsing(updateCustomRecordDataValidator)

      record.merge({ content, datetime })

      await record.save()

      return response.ok({
        message: 'Record data updated successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Record data cannot be updated',
        errors: error.messages,
      })
    }
  }

  public delete = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()
      const record = await CustomRecordData.findOrFail(request.param('id'))

      await record.delete()

      return response.ok({
        message: 'Record data deleted successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Record data cannot be deleted',
        errors: error.messages,
      })
    }
  }
}
