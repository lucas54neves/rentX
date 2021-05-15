import { Request, Response } from 'express'
import { CategoryImportingUseCase } from './CategoryImportingUseCase'

export class CategoryImportingController {
  constructor(private categoryImportingUseCase: CategoryImportingUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request

    await this.categoryImportingUseCase.execute(file)

    return response.status(200).send()
  }
}
