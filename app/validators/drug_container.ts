import vine from '@vinejs/vine'

export const createDrugContainerValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(2)
      .unique(async (db, value) => {
        const container = await db.from('drug_containers').where('name', value).first()
        return !container
      }),
  })
)
