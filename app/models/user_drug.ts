import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import DrugBrand from '#models/drug_brand'
import DrugName from '#models/drug_name'
import { DrugForm, DrugUnit } from '../../types/constants.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class UserDrug extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare drugBrandId: number

  @belongsTo(() => DrugBrand)
  declare drugBrand: BelongsTo<typeof DrugBrand>

  @column()
  declare drugNameId: number

  @belongsTo(() => DrugName)
  declare drugName: BelongsTo<typeof DrugName>

  @column()
  declare form: DrugForm

  @column()
  declare dose: number

  @column()
  declare note: string | null

  @column()
  declare unit: DrugUnit

  @column.dateTime()
  declare expirationDateTime: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
