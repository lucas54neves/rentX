import { CarCreationRequest } from '@modules/cars/dtos'
import { Car } from '@modules/cars/infra/typeorm/entities'
import { CarsRepositoryInterface } from '@modules/cars/repositories'
import { AppError } from '@shared/errors'
import { inject, injectable } from 'tsyringe'

@injectable()
class CarCreationUseCase {
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
  }: CarCreationRequest): Promise<Car> {
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

export { CarCreationUseCase }
