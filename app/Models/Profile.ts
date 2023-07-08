import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { randomUUID } from "node:crypto"

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public bio?: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public userId: string

  @beforeCreate()
  public static async generateUUID(profile: Profile) {
    profile.id = randomUUID()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
