import {
  CreateCarRequest,
  CreateSpecificationRequest
} from '@modules/cars/dtos'
import {
  CarsRepositoryInMemory,
  SpecificationsRespositoryInMemory
} from '@modules/cars/repositories'
import { AppError } from '@shared/errors'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase

let carsRepositoryInMemory: CarsRepositoryInMemory

let specificationsRepositoryInMemory: SpecificationsRespositoryInMemory

let testCars: CreateCarRequest[]

let testSpecifications: CreateSpecificationRequest[]

describe('Create car specification', () => {
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
      }
    ]

    testSpecifications = [
      {
        name: 'Test specification',
        description: 'Test specification description 1'
      },
      {
        name: 'Test specification',
        description: 'Test specification description 2'
      }
    ]
  })

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()

    specificationsRepositoryInMemory = new SpecificationsRespositoryInMemory()

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create(testCars[0])

    const specification = await specificationsRepositoryInMemory.create(
      testSpecifications[0]
    )

    const specificationsId = [specification.id]

    await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId
    })

    expect(car).toHaveProperty('specifications')
    expect(car.specifications.length).toBe(1)
  })

  it('should not be able to add a new specification to an nonexists car', async () => {
    await expect(async () => {
      const carId = '123'

      const specificationsId = ['321']

      await createCarSpecificationUseCase.execute({
        carId,
        specificationsId
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
