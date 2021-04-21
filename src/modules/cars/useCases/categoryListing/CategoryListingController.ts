import { Request, Response } from 'express'

import { CategoryListingUseCase } from './CategoryListingUseCase'

export class CategoryListingController {
  constructor(private categoryListingUseCase: CategoryListingUseCase) {}

  handle(request: Request, response: Response): Response {
    return response.json(this.categoryListingUseCase.execute())
  }
}
