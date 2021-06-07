import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CarCreationUseCase } from './CarCreationUseCase'

class CarCreationController {
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

    const carCreationUseCase = container.resolve(CarCreationUseCase)

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

export { CarCreationController }
