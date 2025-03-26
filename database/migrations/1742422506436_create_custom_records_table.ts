import { BaseSchema } from '@adonisjs/lucid/schema'
import { CustomRecordView } from '../../types/constants.js'

export default class extends BaseSchema {
  protected tableName = 'custom_records'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.enum('view', Object.values(CustomRecordView)).nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
