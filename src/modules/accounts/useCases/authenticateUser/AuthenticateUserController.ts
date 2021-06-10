import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const authenticationInfo = await authenticateUserUseCase.execute({
      password,
      email
    })

    return response.status(200).json(authenticationInfo)
  }
}

export { AuthenticateUserController }
