import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

function parseDate(value: string): DateTime {
  const date = DateTime.fromFormat(value, 'dd/MM/yyyy').toUTC()
  if (!date.isValid) {
    throw new Error('Invalid date format')
  }
  return date
}

export const createWaterConsumptionRecordValidator = vine.compile(
  vine.object({
    index: vine.number(),
    date: vine.string().transform(parseDate),
    comment: vine.string().trim().maxLength(500).optional().nullable(),
  })
)

export const updateWaterConsumptionRecordValidator = vine.compile(
  vine.object({
    index: vine.number(),
    date: vine.string().transform(parseDate),
    comment: vine.string().trim().maxLength(500),
  })
)
