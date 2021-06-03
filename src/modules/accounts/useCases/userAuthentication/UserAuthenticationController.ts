import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UserAuthenticationUseCase } from './UserAuthenticationUseCase'

class UserAuthenticationController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const userAuthenticationUseCase = container.resolve(
      UserAuthenticationUseCase
    )

    const authenticationInfo = await userAuthenticationUseCase.execute({
      password,
      email
    })

    return response.status(200).json(authenticationInfo)
  }
}

export { UserAuthenticationController }
