import { Request, Response } from 'express'
import { SpecificationCreationUseCase } from './SpecificationCreationUseCase'

export class SpecificationCreationController {
  constructor(
    private specificationCreationUseCase: SpecificationCreationUseCase
  ) {}

  handle(request: Request, response: Response) {
    const { name, description } = request.body

    try {
      this.specificationCreationUseCase.execute({ name, description })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

    return response.status(201).send()
  }
}
