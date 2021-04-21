import { Request, Response } from 'express'
import { SpecificationListingUseCase } from './SpecificationListingUseCase'

export class SpecificationListingController {
  constructor(
    private specificationListingUseCase: SpecificationListingUseCase
  ) {}

  handle(request: Request, response: Response): Response {
    return response.json(this.specificationListingUseCase.execute())
  }
}
