import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_drugs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('drug_brand_id')
        .unsigned()
        .references('id')
        .inTable('drug_brands')
        .onDelete('CASCADE')
      table
        .integer('drug_name_id')
        .unsigned()
        .references('id')
        .inTable('drug_names')
        .onDelete('CASCADE')
      table.text('form').notNullable()
      table.float('dose').notNullable()
      table.text('unit').notNullable()
      table.text('note').nullable()
      table.timestamp('expiration_date_time')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
