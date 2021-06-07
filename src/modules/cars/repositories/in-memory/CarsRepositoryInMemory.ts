import { CarCreationRequest } from '@modules/cars/dtos'
import { Car } from '@modules/cars/infra/typeorm/entities'
import { CarsRepositoryInterface } from '../CarsRepositoryInterface'

class CarsRepositoryInMemory implements CarsRepositoryInterface {
  private cars: Car[] = []

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId
  }: CarCreationRequest): Promise<Car> {
    const car = new Car(
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId
    )

    this.save(car)

    return car
  }

  async save(car: Car): Promise<void> {
    this.cars.push(car)
  }

  async findByLincensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.licensePlate === licensePlate)
  }
}

export { CarsRepositoryInMemory }
