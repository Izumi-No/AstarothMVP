import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('content').notNullable()
      table.string('post_id').unsigned().references("id").inTable("posts").onDelete("CASCADE")
      table.string('parent_id').unsigned().references("id").inTable("comments").onDelete("CASCADE")
      table.string('author_id').unsigned().references("id").inTable("users").onDelete("CASCADE").notNullable()
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
