import { CreateCarRequest } from '@modules/cars/dtos'
import { CarsRepositoryInMemory } from '@modules/cars/repositories'
import { AppError } from '@shared/errors'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase

let carsRepositoryInMemory: CarsRepositoryInMemory

let testCars: CreateCarRequest[]

describe('Create car', () => {
  beforeAll(() => {
    testCars = [
      {
        name: 'Name Car 1',
        description: 'Test car 1',
        dailyRate: 100,
        licensePlate: 'ABC-123',
        fineAmount: 60,
        brand: 'The Brand',
        categoryId: 'category'
      },
      {
        name: 'Name Car 2',
        description: 'Test car 2',
        dailyRate: 103,
        licensePlate: 'ABC-123',
        fineAmount: 50,
        brand: 'The New Brand',
        categoryId: 'category 2'
      }
    ]
  })

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()

    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute(testCars[0])
  })

  it('should not be able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute(testCars[0])

      await createCarUseCase.execute(testCars[1])
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute(testCars[0])

    expect(car.available).toBe(true)
  })
})
