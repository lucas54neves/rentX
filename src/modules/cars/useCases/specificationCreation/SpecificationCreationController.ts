import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SpecificationCreationUseCase } from './SpecificationCreationUseCase'

export class SpecificationCreationController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    try {
      const specificationCreationUseCase = container.resolve(
        SpecificationCreationUseCase
      )

      await specificationCreationUseCase.execute({ name, description })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

    return response.status(201).send()
  }
}
