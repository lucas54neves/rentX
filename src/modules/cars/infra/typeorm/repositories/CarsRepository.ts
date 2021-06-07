import { getRepository, Repository } from 'typeorm'

import { CarCreationRequest } from '@modules/cars/dtos'
import { CarsRepositoryInterface } from '@modules/cars/repositories'
import { Car } from '../entities'

class CarsRepository implements CarsRepositoryInterface {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId
  }: CarCreationRequest): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId
    })

    await this.save(car)

    return car
  }

  async save(car: Car): Promise<void> {
    await this.repository.save(car)
  }

  async findByLincensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({ licensePlate })
  }
}

export { CarsRepository }
