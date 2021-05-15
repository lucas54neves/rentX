import { Request, Response } from 'express'

import { CategoryCreationUseCase } from './CategoryCreationUseCase'

export class CategoryCreationController {
  constructor(private categoryCreationUseCase: CategoryCreationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    try {
      await this.categoryCreationUseCase.execute({ name, description })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

    return response.status(201).send()
  }
}
