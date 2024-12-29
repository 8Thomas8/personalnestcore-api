import vine from '@vinejs/vine'
import { passwordReg } from '../../types/constants.js'

export const registerUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .minLength(6)
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().trim().minLength(8).regex(passwordReg).escape(),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().minLength(6),
    password: vine.string().trim().minLength(8),
  })
)
