import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'drug_names'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('name').notNullable()
      table
        .integer('drug_brand_id')
        .unsigned()
        .references('id')
        .inTable('drug_brands')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
