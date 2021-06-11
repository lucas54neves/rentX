import {
  AddSpecificationRequest,
  CreateCarRequest,
  FindSpecificationInCarsRepositoryRequest,
  ListAvailableCarsRequest
} from '@modules/cars/dtos'
import { Car, Specification } from '@modules/cars/infra/typeorm/entities'
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
  }: CreateCarRequest): Promise<Car> {
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

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.id === id)
  }

  async findByLincensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.licensePlate === licensePlate)
  }

  async findAvailable({
    name,
    brand,
    categoryId
  }: ListAvailableCarsRequest): Promise<Car[]> {
    return this.cars.filter(
      (car) =>
        car.available === true ||
        (name && car.name === name) ||
        (brand && car.brand === brand) ||
        (categoryId && car.categoryId === categoryId)
    )
  }

  async addSpecification({
    car,
    specification
  }: AddSpecificationRequest): Promise<void> {
    car.specifications.push(specification)

    await this.save(car)
  }

  async findSpecification({
    car,
    specificationId
  }: FindSpecificationInCarsRepositoryRequest): Promise<
    Specification | undefined | null
  > {
    if (!car.specifications) {
      return null
    }

    return car.specifications.find(
      (specification) => specification.id === specificationId
    )
  }
}

export { CarsRepositoryInMemory }
