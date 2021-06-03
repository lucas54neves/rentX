import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { SpecificationListingUseCase } from './SpecificationListingUseCase'

class SpecificationListingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const specificationListingUseCase = container.resolve(
      SpecificationListingUseCase
    )

    return response
      .status(200)
      .json(await specificationListingUseCase.execute())
  }
}

export { SpecificationListingController }
