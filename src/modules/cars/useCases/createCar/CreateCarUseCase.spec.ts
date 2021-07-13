import { CreateCarRequest } from '@modules/cars/dtos'
import { Category } from '@modules/cars/infra/typeorm/entities'
import {
  CarsRepositoryInMemory,
  CategoriesRepositoryInMemory
} from '@modules/cars/repositories'
import { AppError } from '@shared/errors'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase

let carsRepositoryInMemory: CarsRepositoryInMemory

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

let testCars: CreateCarRequest[]

let category: Category

describe('Create car', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()

    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)

    category = await categoriesRepositoryInMemory.create({
      name: 'Test category',
      description: 'Test category'
    })

    testCars = [
      {
        name: 'Name Car 1',
        description: 'Test car 1',
        dailyRate: 100,
        licensePlate: 'ABC-123',
        fineAmount: 60,
        brand: 'The Brand',
        categoryId: category.id
      },
      {
        name: 'Name Car 2',
        description: 'Test car 2',
        dailyRate: 103,
        licensePlate: 'ABC-123',
        fineAmount: 50,
        brand: 'The New Brand',
        categoryId: category.id
      }
    ]
  })

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute(testCars[0])
  })

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute(testCars[0])

    await expect(createCarUseCase.execute(testCars[1])).rejects.toEqual(
      new AppError('Car already exists')
    )
  })

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute(testCars[0])

    expect(car.available).toBe(true)
  })
})
