import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('content').notNullable()
      table.string('title').notNullable()
      table.integer('points').defaultTo(0)
      table.string('author_id').notNullable().references("id").inTable("users").unsigned().onDelete("CASCADE")
      table.string('status').defaultTo('ACTIVE')
      table.timestamp('published_at')
      table.timestamp('deleted_at')      

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
