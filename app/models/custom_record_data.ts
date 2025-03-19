import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import CustomRecord from '#models/custom_record'

export default class CustomRecordData extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column.dateTime()
  declare datetime: DateTime

  @column()
  declare customRecordId: number

  @belongsTo(() => CustomRecord)
  declare customRecord: BelongsTo<typeof CustomRecord>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
