import vine from '@vinejs/vine'
import { passwordReg, usernameReg } from '../../types/constants.js'

export const createUserValidator = vine.compile(
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
    password: vine.string().trim().minLength(8).regex(passwordReg).escape(),
  })
)

export const updateUserValidator = vine.compile(
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
      .escape()
      .optional(),
    password: vine.string().trim().minLength(8).regex(passwordReg).escape().optional(),
  })
)
