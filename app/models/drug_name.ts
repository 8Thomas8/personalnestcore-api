import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import DrugBrand from '#models/drug_brand'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class DrugName extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare drugBrandId: number

  @belongsTo(() => DrugBrand)
  declare drugBrand: BelongsTo<typeof DrugBrand>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
