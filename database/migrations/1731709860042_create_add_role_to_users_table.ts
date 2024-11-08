import { BaseSchema } from '@adonisjs/lucid/schema'

const UserRole = {
  User: 'ROLE_USER',
  Admin: 'ROLE_ADMIN',
} as const

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', Object.values(UserRole)).notNullable().defaultTo(UserRole.User)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
    })
  }
}
