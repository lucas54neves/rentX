import { ListAvailableCarsRequest } from '@modules/cars/dtos'
import { Car } from '@modules/cars/infra/typeorm/entities'
import { CarsRepositoryInterface } from '@modules/cars/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: CarsRepositoryInterface
  ) {}

  async execute({
    name,
    brand,
    categoryId
  }: ListAvailableCarsRequest): Promise<Car[]> {
    return this.carsRepository.findAvailable({
      name,
      brand,
      categoryId
    })
  }
}

export { ListAvailableCarsUseCase }
