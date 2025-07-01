import vine from '@vinejs/vine'

export const createKitValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(4)
      .maxLength(25)
      .unique(async (db, value) => {
        const kit = await db.from('kits').where('name', value).first()
        return !kit
      }),
    list: vine.array(
      vine.object({
        name: vine.string().trim().maxLength(100),
        checked: vine.boolean(),
      })
    ),
  })
)

export const updateKitValidator = (kitId: number | string) =>
  vine.compile(
    vine.object({
      name: vine
        .string()
        .trim()
        .minLength(4)
        .maxLength(25)
        .unique(async (db, value) => {
          const kit = await db.from('kits').where('name', value).whereNot('id', kitId).first()
          return !kit
        }),
      list: vine.array(
        vine.object({
          name: vine.string().trim().maxLength(100),
          checked: vine.boolean(),
        })
      ),
    })
  )
