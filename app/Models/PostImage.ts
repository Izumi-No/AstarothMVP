import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, beforeCreate, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import { attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import {randomUUID} from "node:crypto"


export default class PostImage extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @column()
  public post_id: string

  @attachment()
  public image: AttachmentContract


  @column()
  public postId: string

  @beforeCreate()
  public static async generateUUID(postImage: PostImage) {
    postImage.id = randomUUID()
  }


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
