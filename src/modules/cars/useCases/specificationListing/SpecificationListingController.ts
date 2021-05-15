import { Request, Response } from 'express'
import { SpecificationListingUseCase } from './SpecificationListingUseCase'

export class SpecificationListingController {
  constructor(
    private specificationListingUseCase: SpecificationListingUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    return response.status(200).json(this.specificationListingUseCase.execute())
  }
}
