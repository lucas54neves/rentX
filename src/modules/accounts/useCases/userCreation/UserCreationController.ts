import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UserCreationUseCase } from './UserCreationUseCase'

class UserCreationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, driverLicense } = request.body

    const userCreationUseCase = container.resolve(UserCreationUseCase)

    await userCreationUseCase.execute({
      name,
      username,
      email,
      password,
      driverLicense
    })

    return response.status(201).send()
  }
}

export { UserCreationController }
