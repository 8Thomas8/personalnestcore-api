import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableNameSupports = 'supports'
  protected tableNameSupportResponses = 'support_responses'

  public async up() {
    this.schema.createTable(this.tableNameSupports, (table) => {
      table.increments('id').notNullable()
      table.text('message').notNullable()
      table.enu('status', ['new', 'in progress', 'done']).defaultTo('new').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })

    this.schema.createTable(this.tableNameSupportResponses, (table) => {
      table.increments('id').notNullable()
      table.text('message').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('support_id')
        .unsigned()
        .references('id')
        .inTable('supports')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableNameSupportResponses)
    this.schema.dropTable(this.tableNameSupports)
  }
}
