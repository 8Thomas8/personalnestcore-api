import vine from '@vinejs/vine'

export const createSupportValidator = vine.compile(
  vine.object({
    message: vine.string().trim().minLength(50).maxLength(2000),
    status: vine.enum(['new', 'in progress', 'done'] as const).optional(),
  })
)

export const updateSupportValidator = vine.compile(
  vine.object({
    status: vine.enum(['new', 'in progress', 'done'] as const),
  })
)
