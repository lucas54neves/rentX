import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CategoryListingUseCase } from './CategoryListingUseCase'

class CategoryListingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const categoryListingUseCase = container.resolve(CategoryListingUseCase)

    return response.status(200).json(await categoryListingUseCase.execute())
  }
}

export { CategoryListingController }
