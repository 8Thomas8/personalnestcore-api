import vine from '@vinejs/vine'

export const createDrugBrandValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(2)
      .unique(async (db, value) => {
        const brand = await db.from('drug_brands').where('name', value).first()
        return !brand
      })
      .escape(),
  })
)
