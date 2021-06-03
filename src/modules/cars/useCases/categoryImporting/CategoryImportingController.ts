import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CategoryImportingUseCase } from './CategoryImportingUseCase'

class CategoryImportingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request

    const categoryImportingUseCase = container.resolve(CategoryImportingUseCase)

    await categoryImportingUseCase.execute(file)

    return response.status(201).send()
  }
}

export { CategoryImportingController }
