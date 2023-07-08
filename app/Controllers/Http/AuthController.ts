import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import LoginValidator from 'App/Validators/LoginValidator';
import NewUserValidator from 'App/Validators/NewUserValidator';

export default class AuthController {
    public async login({ request, auth }: HttpContextContract) {
        const data = await request.validate(LoginValidator)
        const user = await User.findByOrFail('email', data.email)
        const jwt = await auth.use('jwt').attempt(user.id, data.password)
        return jwt
      }
    
      public async register({ request, auth }: HttpContextContract) {
        const { name, email, password } = await request.validate(NewUserValidator)
        const user = await User.create({ name, email, password })
        const jwt = await auth.use('jwt').login(user)
    
        return jwt
      }
    
      public async logout({ auth }: HttpContextContract) {
        await auth.use('jwt').revoke()
        return {
          revoked: true,
        }
      }
      
      public async loginWithRefresh({ auth, request }: HttpContextContract) {
        const { refreshToken }: { refreshToken: string } = request.only(['refreshToken'])
    
        const jwt = await auth.use('jwt').loginViaRefreshToken(refreshToken)
        return jwt
      }
}
