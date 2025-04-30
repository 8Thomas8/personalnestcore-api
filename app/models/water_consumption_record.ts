import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class WaterUsageRecord extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare index: number

  @column()
  declare date: DateTime

  @column()
  declare comment: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
