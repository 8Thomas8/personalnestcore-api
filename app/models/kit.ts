import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

interface KitItem {
  name: string
  checked: boolean
}

export default class Kit extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column({
    prepare: (value: KitItem[]) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare list: KitItem[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
