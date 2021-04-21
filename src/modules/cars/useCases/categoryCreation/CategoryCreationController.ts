import { Request, Response } from 'express'

import { CategoryCreationUseCase } from './CategoryCreationUseCase'

export class CategoryCreationController {
  constructor(private categoryCreationUseCase: CategoryCreationUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    try {
      this.categoryCreationUseCase.execute({ name, description })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

    return response.status(201).send()
  }
}
