import { container } from 'tsyringe'

import { Request, Response } from 'express'
import { CreateCarUseCase } from './CreateCarUseCase'

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId
    } = request.body

    const carCreationUseCase = container.resolve(CreateCarUseCase)

    const car = await carCreationUseCase.execute({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId
    })

    return response.status(201).json(car)
  }
}

export { CreateCarController }
