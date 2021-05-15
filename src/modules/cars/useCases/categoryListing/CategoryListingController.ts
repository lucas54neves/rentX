import { Request, Response } from 'express'

import { CategoryListingUseCase } from './CategoryListingUseCase'

export class CategoryListingController {
  constructor(private categoryListingUseCase: CategoryListingUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    return response
      .status(200)
      .json(await this.categoryListingUseCase.execute())
  }
}
