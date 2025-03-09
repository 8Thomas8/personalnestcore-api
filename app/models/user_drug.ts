import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import DrugBrand from '#models/drug_brand'
import DrugName from '#models/drug_name'
import { DrugForm, DrugUnit } from '../../types/constants.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import DrugContainer from '#models/drug_container'

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
  declare drugContainerId: number

  @belongsTo(() => DrugContainer)
  declare drugContainer: BelongsTo<typeof DrugContainer>

  @column()
  declare form: DrugForm

  @column()
  declare dose: number | null

  @column()
  declare note: string | null

  @column()
  declare unit: DrugUnit | null

  @column.dateTime()
  declare expirationDateTime: DateTime

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
