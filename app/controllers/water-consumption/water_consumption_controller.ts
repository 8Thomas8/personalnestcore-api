import { HttpContext } from '@adonisjs/core/http'
import WaterConsumptionRecord from '#models/water_consumption_record'
import { DateTime } from 'luxon'
import {
  createWaterConsumptionRecordValidator,
  updateWaterConsumptionRecordValidator,
} from '#validators/water-consumption/water_consumption_record'

export default class WaterConsumptionController {
  public readAll = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()

      const { itemPerPage, startDate, endDate } = request.qs()

      const query = WaterConsumptionRecord.query()

      const defaultStartDate = DateTime.now().minus({ months: 1 })
      const defaultEndDate = DateTime.now()
      const isoStartDate = startDate
        ? DateTime.fromFormat(startDate, 'dd/MM/yyyy').startOf('day').toISO()
        : defaultStartDate.startOf('day').toISO()
      const isoEndDate = endDate
        ? DateTime.fromFormat(endDate, 'dd/MM/yyyy').endOf('day').toISO()
        : defaultEndDate.endOf('day').toISO()

      if (!isoStartDate || !isoEndDate) {
        return response.badRequest({
          message: 'Invalid date format',
        })
      }

      query.whereBetween('date', [isoStartDate, isoEndDate])

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

      const { index, date, comment } = await request.validateUsing(
        createWaterConsumptionRecordValidator
      )

      return response.created(await WaterConsumptionRecord.create({ index, date, comment }))
    } catch (error) {
      return response.badRequest({
        message: 'Water consumption record cannnot be created',
        errors: error.messages,
      })
    }
  }

  public delete = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()

      const waterConsumptionRecord = await WaterConsumptionRecord.findOrFail(request.param('id'))

      await waterConsumptionRecord.delete()

      return response.ok({
        message: 'Water consumption record deleted successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Water consumption record cannot be deleted',
        errors: error.messages,
      })
    }
  }

  public update = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()

      const waterConsumptionRecord = await WaterConsumptionRecord.findOrFail(request.param('id'))
      const { index, date, comment } = await request.validateUsing(
        updateWaterConsumptionRecordValidator
      )

      waterConsumptionRecord.merge({ index, date, comment })

      await waterConsumptionRecord.save()

      return response.ok({
        message: 'Water consumption record updated successfully',
      })
    } catch (error) {
      return response.badRequest({
        message: 'Water consumption record cannot be updated',
        errors: error.messages,
      })
    }
  }
}
