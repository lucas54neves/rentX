import { RentalsRepositoryInMemory } from '@modules/rentals/repositories'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayjsDateProvider'
import { AppError } from '@shared/errors'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import {
  CarsRepositoryInMemory,
  CategoriesRepositoryInMemory
} from '@modules/cars/repositories'
import { Car } from '@modules/cars/infra/typeorm/entities'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories'
import { User } from '@modules/accounts/infra/typeorm/entities'

let createRentalUseCase: CreateRentalUseCase

let rentalsRepositoryInMemory: RentalsRepositoryInMemory

let carsRepositoryInMemory: CarsRepositoryInMemory

let usersRepositoryInMemory: UsersRepositoryInMemory

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

let dayJsProvider: DayjsDateProvider

let users: User[]

let cars: Car[]

describe('Create rental', () => {
  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()

    dayJsProvider = new DayjsDateProvider()

    carsRepositoryInMemory = new CarsRepositoryInMemory()

    usersRepositoryInMemory = new UsersRepositoryInMemory()

    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory
    )

    const category = await categoriesRepositoryInMemory.create({
      name: 'Test category',
      description: 'Test category'
    })

    users = [
      await usersRepositoryInMemory.create({
        name: 'Name test 1',
        email: 'teste1@rentx.com',
        password: 'blavbla12345',
        driverLicense: '1HFG435',
        username: 'testinho1'
      }),
      await usersRepositoryInMemory.create({
        name: 'Name test 2',
        email: 'teste2@rentx.com',
        password: 'blavbla12345',
        driverLicense: '1HFG436',
        username: 'testinho2'
      })
    ]

    cars = [
      await carsRepositoryInMemory.create({
        name: 'Name Car 1',
        description: 'Test car 1',
        dailyRate: 100,
        licensePlate: 'ABC-123',
        fineAmount: 60,
        brand: 'The Brand',
        categoryId: category.id
      }),
      await carsRepositoryInMemory.create({
        name: 'Name Car 2',
        description: 'Test car 2',
        dailyRate: 200,
        licensePlate: 'ABC-223',
        fineAmount: 60,
        brand: 'The Brand',
        categoryId: category.id
      })
    ]
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      carId: cars[0].id,
      expectedReturnDate: dayJsProvider.add48HoursToNow(),
      userId: users[0].id
    })

    const carUpdated = await carsRepositoryInMemory.findById(cars[0].id)

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('startDate')
    expect(carUpdated).not.toBeUndefined()
    if (carUpdated) {
      expect(carUpdated.available).toBe(false)
    }
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await createRentalUseCase.execute({
      carId: cars[0].id,
      expectedReturnDate: dayJsProvider.add48HoursToNow(),
      userId: users[0].id
    })

    await expect(
      createRentalUseCase.execute({
        carId: cars[1].id,
        expectedReturnDate: dayJsProvider.add48HoursToNow(),
        userId: users[0].id
      })
    ).rejects.toEqual(new AppError(`There's a rental in progress for user`))
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await createRentalUseCase.execute({
      carId: cars[0].id,
      expectedReturnDate: dayJsProvider.add48HoursToNow(),
      userId: users[0].id
    })

    await expect(
      createRentalUseCase.execute({
        carId: cars[0].id,
        expectedReturnDate: dayJsProvider.add48HoursToNow(),
        userId: users[1].id
      })
    ).rejects.toEqual(new AppError('Car is unavailable'))
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        carId: cars[0].id,
        expectedReturnDate: dayJsProvider.dateNow(),
        userId: users[0].id
      })
    ).rejects.toEqual(new AppError(`Invalid return time`))
  })
})
