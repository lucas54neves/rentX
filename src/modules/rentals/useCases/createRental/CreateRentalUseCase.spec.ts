import dayjs from 'dayjs'

import { CreateRentalRequestInterface } from '@modules/rentals/dtos'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayjsDateProvider'
import { AppError } from '@shared/errors'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import { CarsRepositoryInMemory } from '@modules/cars/repositories'
import { Car } from '@modules/cars/infra/typeorm/entities'
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase'

let createRentalUseCase: CreateRentalUseCase

let createCarUseCase: CreateCarUseCase

let rentalsRepositoryInMemory: RentalsRepositoryInMemory

let carsRepositoryInMemory: CarsRepositoryInMemory

let testDate: CreateRentalRequestInterface[]

let dayJsProvider: DayjsDateProvider

let dayAdd24Hours: Date

describe('Create rental', () => {
  beforeAll(() => {
    dayAdd24Hours = dayjs().add(1, 'day').toDate()

    testDate = [
      {
        userId: '123',
        carId: '123456',
        expectedReturnDate: dayAdd24Hours
      },
      {
        userId: '123',
        carId: '123457',
        expectedReturnDate: dayAdd24Hours
      },
      {
        userId: '124',
        carId: '123457',
        expectedReturnDate: dayAdd24Hours
      },
      {
        userId: '125',
        carId: '123458',
        expectedReturnDate: dayjs().toDate()
      }
    ]
  })

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()

    dayJsProvider = new DayjsDateProvider()

    carsRepositoryInMemory = new CarsRepositoryInMemory()

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory
    )

    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new rental', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car 1',
      description: 'Test car 1',
      dailyRate: 100,
      licensePlate: 'ABC-123',
      fineAmount: 60,
      brand: 'The Brand',
      categoryId: 'category'
    })

    const rental = await createRentalUseCase.execute({
      carId: car.id,
      expectedReturnDate: testDate[0].expectedReturnDate,
      userId: testDate[0].userId
    })

    const carUpdated = (await carsRepositoryInMemory.findById(car.id)) as Car

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('startDate')
    expect(carUpdated).not.toBeUndefined()
    expect(carUpdated.available).toBe(false)
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await expect(async () => {
      await createRentalUseCase.execute(testDate[0])

      await createRentalUseCase.execute(testDate[1])
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await expect(async () => {
      await createRentalUseCase.execute(testDate[1])

      await createRentalUseCase.execute(testDate[2])
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(async () => {
      await createRentalUseCase.execute(testDate[3])
    }).rejects.toBeInstanceOf(AppError)
  })
})
