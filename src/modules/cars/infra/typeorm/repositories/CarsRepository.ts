import { getRepository, Repository } from 'typeorm'

import {
  AddSpecificationRequest,
  CreateCarRequest,
  FindSpecificationInCarsRepositoryRequest,
  ListAvailableCarsRequest
} from '@modules/cars/dtos'
import { CarsRepositoryInterface } from '@modules/cars/repositories'
import { Car, Specification } from '../entities'

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
  }: CreateCarRequest): Promise<Car> {
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

  async findById(id: string): Promise<Car | undefined> {
    return this.repository.findOne(id)
  }

  async findByLincensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({ licensePlate })
  }

  async findAvailable({
    name,
    brand,
    categoryId
  }: ListAvailableCarsRequest): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true })

    if (name) {
      carsQuery.andWhere('name = :name', { name })
    }

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand })
    }

    if (categoryId) {
      carsQuery.andWhere('"categoryId" = :categoryId', { categoryId })
    }

    return carsQuery.getMany()
  }

  async addSpecification({
    car,
    specification
  }: AddSpecificationRequest): Promise<void> {
    if (car.specifications) {
      car.specifications.push(specification)
    } else {
      car.specifications = [specification]
    }

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

export { CarsRepository }
