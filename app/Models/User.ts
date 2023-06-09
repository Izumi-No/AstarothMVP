import { DateTime } from 'luxon'
import { BaseModel, HasOne, beforeCreate, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import {randomUUID} from "node:crypto"
import Profile from './Profile'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @hasOne(() => Profile, {
    foreignKey: 'id',
    localKey: 'profile_id',
  })
  public profile: HasOne<typeof Profile>


  @column({ columnName: 'profile_id' })
  public profileId: string


  @column()
  public email: string

  @column()
  public password: string

  @column()
  public rememberMeToken?: string
  

  @beforeCreate()
  public static async generateUUID(user: User) {
    user.id = randomUUID()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
