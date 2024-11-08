import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Support from '#models/support'
import User from '#models/user'

export default class SupportResponse extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare message: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare supportId: number

  @belongsTo(() => Support)
  declare support: BelongsTo<typeof Support>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
