import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createWaterConsumptionRecordValidator = vine.compile(
  vine.object({
    index: vine.number(),
    date: vine.string().transform((value) => {
      const date = DateTime.fromFormat(value, 'dd/MM/yyyy')
      if (!date.isValid) {
        throw new Error('Invalid date format')
      }
      return date
    }),
    comment: vine.string().trim().maxLength(500),
  })
)

export const updateWaterConsumptionRecordValidator = vine.compile(
  vine.object({
    index: vine.number(),
    date: vine.string().transform((value) => {
      const date = DateTime.fromFormat(value, 'dd/MM/yyyy')
      if (!date.isValid) {
        throw new Error('Invalid date format')
      }
      return date
    }),
    comment: vine.string().trim().maxLength(500),
  })
)
