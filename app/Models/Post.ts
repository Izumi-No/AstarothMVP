import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, beforeCreate, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import PostImage from './PostImage'
import {randomUUID} from "node:crypto"


export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  title: string

  @column()
  content: string

  @column()
  public points: number

  @hasMany(() => PostImage)
  images: HasMany<typeof PostImage>

  @hasOne(() => User, {
    foreignKey: 'id',
    localKey: 'author_id',
  })
  Author: HasOne<typeof User>

  @column({ columnName: 'author_id' })
  public authorId: string

  @column()
  public status: string = 'ACTIVE'

  @column()
  public publishedAt: DateTime

  @column()
  public deletedAt: DateTime


  @beforeCreate()
  public static async generateUUID(post: Post) {
    post.id = randomUUID()
  }
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
