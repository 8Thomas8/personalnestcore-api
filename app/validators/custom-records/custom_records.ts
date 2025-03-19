import vine from '@vinejs/vine'
import { CustomRecordView } from '../../../types/constants.js'

export const createCustomRecordValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(2)
      .unique(async (db, value) => {
        const brand = await db.from('custom_records').where('name', value).first()
        return !brand
      }),
    view: vine.enum(CustomRecordView).nullable(),
  })
)

export const updateCustomRecordValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(2)
      .unique(async (db, value) => {
        const brand = await db.from('custom_records').where('name', value).first()
        return !brand
      }),
    view: vine.enum(CustomRecordView).nullable(),
  })
)
