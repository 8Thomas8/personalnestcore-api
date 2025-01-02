import vine from '@vinejs/vine'

export const readAllDrugNameByDrugBrandIdValidator = vine.compile(
  vine.object({
    drugBrandId: vine.number().exists(async (db, value) => {
      return await db.from('drug_brands').where('id', value).first()
    }),
  })
)

export const createDrugNameValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(2)
      .unique(async (db, value) => {
        const name = await db.from('drug_names').where('name', value).first()
        return !name
      }),
    drugBrandId: vine.number().exists(async (db, value) => {
      const brand = await db.from('drug_brands').where('id', value).first()
      return !!brand
    }),
  })
)

export const updateDrugNameValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(2)
      .unique(async (db, value) => {
        const name = await db.from('drug_names').where('name', value).first()
        return !name
      }),
  })
)
