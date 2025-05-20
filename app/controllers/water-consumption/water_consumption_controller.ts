import { HttpContext } from '@adonisjs/core/http'
import WaterConsumptionRecord from '#models/water_consumption_record'
import { DateTime } from 'luxon'
import {
  createWaterConsumptionRecordValidator,
  updateWaterConsumptionRecordValidator,
} from '#validators/water-consumption/water_consumption_record'

interface AggregationResult {
  $extras: {
    minIndex: number | null
    maxIndex: number | null
  }
}

export default class WaterConsumptionController {
  public readAll = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()

      const { itemPerPage, startDate, endDate } = request.qs()

      const query = WaterConsumptionRecord.query()

      const defaultStartDate = DateTime.now().minus({ year: 1 })
      const defaultEndDate = DateTime.now()
      const isoStartDate = startDate
        ? DateTime.fromFormat(startDate, 'dd/MM/yyyy').toUTC().startOf('day').toISO()
        : defaultStartDate.toUTC().startOf('day').toISO()
      const isoEndDate = endDate
        ? DateTime.fromFormat(endDate, 'dd/MM/yyyy').toUTC().endOf('day').toISO()
        : defaultEndDate.toUTC().endOf('day').toISO()

      if (!isoStartDate || !isoEndDate) {
        return response.badRequest({
          message: 'Invalid date format',
        })
      }

      query
        .whereRaw('DATE(date) >= DATE(?)', [isoStartDate])
        .whereRaw('DATE(date) <= DATE(?)', [isoEndDate])

      return response.ok(
        await query.paginate(request.input('page', 1), Number.parseInt(itemPerPage, 10) || 20)
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

      const { index, date, comment } = await request.validateUsing(
        createWaterConsumptionRecordValidator
      )

      return response.created(await WaterConsumptionRecord.create({ index, date, comment }))
    } catch (error) {
      return response.badRequest({
        message: 'Water consumption record cannot be created',
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

  public averageInRange = async ({ auth, request, response }: HttpContext) => {
    try {
      await auth.authenticate()

      const { startDate, endDate } = request.qs()

      const query = WaterConsumptionRecord.query()

      const defaultStartDate = DateTime.now().startOf('year')
      const isoStartDate = startDate
        ? DateTime.fromFormat(startDate, 'dd/MM/yyyy').toUTC().startOf('day').toISO()
        : defaultStartDate.toUTC().startOf('day').toISO()

      let isoEndDate: string | null
      if (endDate) {
        isoEndDate = DateTime.fromFormat(endDate, 'dd/MM/yyyy').toUTC().endOf('day').toISO()
      } else {
        const currentYear = DateTime.now().year
        const lastRecord = await WaterConsumptionRecord.query()
          .whereRaw("strftime('%Y', date) = ?", [currentYear.toString()])
          .orderBy('date', 'desc')
          .first()

        isoEndDate = lastRecord
          ? lastRecord.date.toUTC().endOf('day').toISO()
          : DateTime.now().toUTC().endOf('day').toISO()
      }

      if (!isoStartDate || !isoEndDate) {
        return response.badRequest({
          message: 'Invalid date format',
        })
      }

      const result = (await query
        .whereRaw('DATE(date) >= DATE(?)', [isoStartDate])
        .whereRaw('DATE(date) <= DATE(?)', [isoEndDate])
        .min('index as minIndex')
        .max('index as maxIndex')
        .first()) as unknown as AggregationResult

      if (!result || result.$extras.minIndex === null || result.$extras.maxIndex === null) {
        return response.ok({ average: 0 })
      }

      const total = result.$extras.maxIndex - result.$extras.minIndex

      const months = DateTime.fromISO(isoEndDate).diff(
        DateTime.fromISO(isoStartDate),
        'months'
      ).months

      const average = Math.round(total / months)

      return response.ok({ average })
    } catch (error) {
      return response.badRequest({
        message: 'Error while calculating the average',
        errors: error.messages,
      })
    }
  }
}
