import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    )

    return response.status(200).json(await listSpecificationsUseCase.execute())
  }
}

export { ListSpecificationsController }
