import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CategoryCreationUseCase } from './CategoryCreationUseCase'

class CategoryCreationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    try {
      const categoryCreationUseCase = container.resolve(CategoryCreationUseCase)

      await categoryCreationUseCase.execute({ name, description })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

    return response.status(201).send()
  }
}

export { CategoryCreationController }
