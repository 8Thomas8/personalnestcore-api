import vine from '@vinejs/vine'
import { passwordReg } from '../../types/constants.js'
import { Database } from '@adonisjs/lucid/database'

export const createUserValidator = vine.compile(
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

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .minLength(6)
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      })
      .optional(),
    password: vine.string().trim().minLength(8).regex(passwordReg).escape().optional(),
  })
)

export const deleteUserValidator = vine.compile(
  vine.object({
    id: vine.string().exists(async (db: Database, value: string) => {
      return await db.from('users').where('id', value).first()
    }),
  })
)
