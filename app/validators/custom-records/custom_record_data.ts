import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

const transformDate = (value: string) => {
  const date = DateTime.fromISO(value)
  if (!date.isValid) {
    throw new Error('Format de date invalide')
  }
  return date
}

export const createCustomRecordDataValidator = vine.compile(
  vine.object({
    content: vine.string().trim().maxLength(500),
    datetime: vine.string().transform(transformDate),
  })
)

export const updateCustomRecordDataValidator = vine.compile(
  vine.object({
    content: vine.string().trim().maxLength(500),
    datetime: vine.string().transform(transformDate),
  })
)
