import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_drugs'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('dose').nullable().alter()
      table.text('unit').nullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('dose').notNullable().alter()
      table.text('unit').notNullable().alter()
    })
  }
}
