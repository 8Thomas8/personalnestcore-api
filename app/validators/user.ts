import vine from '@vinejs/vine'
import { passwordReg } from '../../types/constants.js'

export const updateUserValidator = vine.withMetaData<{ userId: number }>().compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .minLength(6)
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.userId)
          .where('email', value)
          .first()
        return !user
      }),
    password: vine.string().trim().minLength(8).regex(passwordReg).escape(),
  })
)
