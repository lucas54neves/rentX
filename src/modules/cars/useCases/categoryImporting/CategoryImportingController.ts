import { Request, Response } from 'express'
import { CategoryImportingUseCase } from './CategoryImportingUseCase'

export class CategoryImportingController {
  constructor(private categoryImportingUseCase: CategoryImportingUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request

    this.categoryImportingUseCase.execute(file)

    return response.send()
  }
}
