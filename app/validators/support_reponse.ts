import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'

export const createSupportResponseValidator = vine.compile(
  vine.object({
    message: vine.string().trim().minLength(10).maxLength(2000),
    supportId: vine.number().exists(async (db: Database, value: string) => {
      return await db.from('supports').where('id', value).first()
    }),
  })
)
