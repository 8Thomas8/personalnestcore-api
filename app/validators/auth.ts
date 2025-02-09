import vine from '@vinejs/vine'
import { passwordReg, usernameReg } from '../../types/constants.js'

export const registerUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(32)
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      })
      .regex(usernameReg)
      .escape(),
    password: vine.string().trim().minLength(8).regex(passwordReg),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(32),
    password: vine.string().trim().minLength(8),
  })
)
