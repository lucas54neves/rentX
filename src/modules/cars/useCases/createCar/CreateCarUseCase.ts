import { inject, injectable } from 'tsyringe'

import { CreateCarRequest } from '@modules/cars/dtos'
import { Car } from '@modules/cars/infra/typeorm/entities'
import { CarsRepositoryInterface } from '@modules/cars/repositories'
import { AppError } from '@shared/errors'

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: CarsRepositoryInterface
  ) {}

  async execute({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId
  }: CreateCarRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLincensePlate(
      licensePlate
    )

    if (carAlreadyExists) {
      throw new AppError('Car already exists')
    }

    return this.carsRepository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId
    })
  }
}

export { CreateCarUseCase }
