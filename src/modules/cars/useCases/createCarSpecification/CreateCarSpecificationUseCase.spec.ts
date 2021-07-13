import {
  CreateCarRequest,
  CreateSpecificationRequest
} from '@modules/cars/dtos'
import {
  Car,
  Category,
  Specification
} from '@modules/cars/infra/typeorm/entities'
import {
  CarsRepositoryInMemory,
  CategoriesRepositoryInMemory,
  SpecificationsRespositoryInMemory
} from '@modules/cars/repositories'
import { AppError } from '@shared/errors'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase

let carsRepositoryInMemory: CarsRepositoryInMemory

let specificationsRepositoryInMemory: SpecificationsRespositoryInMemory

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

let testCars: CreateCarRequest[]

let testSpecifications: CreateSpecificationRequest[]

let car: Car

let category: Category

let specification: Specification

describe('Create car specification', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()

    specificationsRepositoryInMemory = new SpecificationsRespositoryInMemory()

    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )

    category = await categoriesRepositoryInMemory.create({
      name: 'Name category',
      description: 'Description category'
    })

    car = await carsRepositoryInMemory.create({
      name: 'Name Car 1',
      description: 'Test car 1',
      dailyRate: 100,
      licensePlate: 'ABC-123',
      fineAmount: 60,
      brand: 'The Brand',
      categoryId: category.id
    })

    specification = await specificationsRepositoryInMemory.create({
      name: 'Test specification',
      description: 'Test specification description 1'
    })
  })

  it('should be able to add a new specification to the car', async () => {
    await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId: [specification.id]
    })

    expect(car).toHaveProperty('specifications')
    expect(car.specifications.length).toBe(1)
  })

  it('should not be able to add a new specification to an non-existent car', async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        carId: '123',
        specificationsId: [specification.id]
      })
    ).rejects.toEqual(new AppError('Car does not exists'))
  })
})
