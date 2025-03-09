import vine from '@vinejs/vine'
import { DrugForm, DrugUnit } from '../../types/constants.js'
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
    drugBrandId: vine.number().exists(async (db, value) => {
      return await db.from('drug_brands').where('id', value).first()
    }),
    drugContainerId: vine.number().exists(async (db, value) => {
      return await db.from('drug_containers').where('id', value).first()
    }),
    drugNameId: vine.number().exists(async (db, value) => {
      return await db.from('drug_names').where('id', value).first()
    }),
    form: vine.enum(DrugForm),
    dose: vine.number().nullable().optional().requiredIfExists('unit'),
    unit: vine.enum(DrugUnit).nullable().optional().requiredIfExists('dose'),
    expirationDateTime: vine.string().transform(transformDate),
    note: vine.string().trim().maxLength(500).nullable().optional(),
    quantity: vine.number().min(1),
  })
)

export const updateUserDrugValidator = vine.compile(
  vine.object({
    drugBrandId: vine.number().exists(async (db, value) => {
      return await db.from('drug_brands').where('id', value).first()
    }),
    drugContainerId: vine.number().exists(async (db, value) => {
      return await db.from('drug_containers').where('id', value).first()
    }),
    drugNameId: vine.number().exists(async (db, value) => {
      return await db.from('drug_names').where('id', value).first()
    }),
    form: vine.enum(DrugForm),
    dose: vine.number().nullable().optional().requiredIfExists('unit'),
    unit: vine.enum(DrugUnit).nullable().optional().requiredIfExists('dose'),
    expirationDateTime: vine.string().transform(transformDate),
    note: vine.string().trim().maxLength(500).nullable().optional(),
    quantity: vine.number().min(1),
  })
)

export const updateUserDrugQuantityValidator = vine.compile(
  vine.object({
    quantity: vine.number().min(1),
  })
)
