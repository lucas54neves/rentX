import { AppError } from '@shared/errors'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

    if (file) {
      await importCategoryUseCase.execute(file)

      return response.status(201).send()
    } else {
      throw new AppError('Arquivo não encontrado')
    }
  }
}

export { ImportCategoryController }
