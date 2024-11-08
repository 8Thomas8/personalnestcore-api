import vine from '@vinejs/vine'

// Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().minLength(6),
    password: vine.string().trim().minLength(8).regex(passwordReg).escape(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().minLength(6),
    password: vine.string().trim().minLength(8).regex(passwordReg).escape(),
  })
)
