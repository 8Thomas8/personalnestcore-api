import vine from '@vinejs/vine'
import { DrugForm, DrugUnit } from '../../types/constants.js'
import { Database } from '@adonisjs/lucid/database'
import { DateTime } from 'luxon'

const transformDate = (value: string) => {
  const date = DateTime.fromFormat(value, 'dd/MM/yyyy')
  if (!date.isValid) {
    throw new Error('Invalid date format. Expected format: dd/MM/yyyy')
  }
  return date
}

export const createUserDrugValidator = vine.compile(
  vine.object({
    drugBrandId: vine.number().exists(async (db: Database, value: string) => {
      return await db.from('drug_brands').where('id', value).first()
    }),
    drugNameId: vine.number().exists(async (db: Database, value: string) => {
      return await db.from('drug_names').where('id', value).first()
    }),
    form: vine.enum(DrugForm),
    dose: vine.number(),
    unit: vine.enum(DrugUnit),
    expirationDateTime: vine.string().transform(transformDate),
    note: vine.string().trim().maxLength(500).nullable(),
  })
)

export const updateUserDrugValidator = vine.compile(
  vine.object({
    drugBrandId: vine.number().exists(async (db: Database, value: string) => {
      return await db.from('drug_brands').where('id', value).first()
    }),
    drugNameId: vine.number().exists(async (db: Database, value: string) => {
      return await db.from('drug_names').where('id', value).first()
    }),
    form: vine.enum(DrugForm),
    dose: vine.number(),
    unit: vine.enum(DrugUnit),
    expirationDateTime: vine.string().transform(transformDate),
    note: vine.string().trim().maxLength(500).nullable(),
  })
)
