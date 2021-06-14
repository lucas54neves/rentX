import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    try {
      const categoryCreationUseCase = container.resolve(CreateCategoryUseCase)

      const categoryCreated = await categoryCreationUseCase.execute({
        name,
        description
      })

      return response.status(201).json(categoryCreated)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}

export { CreateCategoryController }
