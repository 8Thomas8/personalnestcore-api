import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected containersTableName = 'drug_containers'
  protected userDrugsTableName = 'user_drugs'

  async up() {
    this.schema.createTable(this.containersTableName, (table) => {
      table.increments('id')
      table.text('name').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
    this.schema.alterTable(this.userDrugsTableName, (table) => {
      table
        .integer('drug_container_id')
        .unsigned()
        .references('id')
        .inTable(this.containersTableName)
        .onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.dropTable(this.containersTableName)
    this.schema.alterTable(this.userDrugsTableName, (table) => {
      table.dropForeign(['drug_container_id'])
      table.dropColumn('drug_container_id')
    })
  }
}
