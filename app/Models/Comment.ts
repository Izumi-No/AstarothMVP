import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, beforeCreate, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import {randomUUID} from "node:crypto"
import Post from './Post'
import User from './User'


export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public content: string

  @hasOne(() => User, {
    foreignKey: 'id',
    localKey: 'author_id',
  })
  public author: HasOne<typeof User>

  @column({ columnName: 'author_id' })
  public authorId: string

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @column()
  public status: string

  @column()
  public publishedAt: DateTime

  @column()
  public deletedAt: DateTime

  @column()
  public points: number

  // nullable relationship to itself
  @hasOne(() => Comment, {
    foreignKey: 'id',
    localKey: 'parent_id',
  })
  public parent: HasOne<typeof Comment>

  @column({ columnName: 'parent_id' })
  public parentId?: string

  @hasOne(() => Post, {
    foreignKey: 'id',
    localKey: 'post_id',
  })
  public post: HasOne<typeof Post>

  @column({ columnName: 'post_id' })
  public postId?: string

  @beforeCreate()
  public static async generateUUID(comment: Comment) {
    comment.id = randomUUID()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
