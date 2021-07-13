import { User } from '@modules/accounts/infra/typeorm/entities'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories'
import { Car, Category } from '@modules/cars/infra/typeorm/entities'
import {
  CarsRepositoryInMemory,
  CategoriesRepositoryInMemory
} from '@modules/cars/repositories'
import { Rental } from '@modules/rentals/infra/typeorm/entities'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayjsDateProvider'
import { AppError } from '@shared/errors'
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase'

let rentalsRepositoryInMemory: RentalsRepositoryInMemory

let carsRepositoryInMemory: CarsRepositoryInMemory

let usersRepositoryInMemory: UsersRepositoryInMemory

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

let dateProvider: DayjsDateProvider

let devolutionRentalUseCase: DevolutionRentalUseCase

let devolution: Rental

let car: Car

let rental: Rental

let user: User

let category: Category

describe('Devolution rental', () => {
  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()

    carsRepositoryInMemory = new CarsRepositoryInMemory()

    usersRepositoryInMemory = new UsersRepositoryInMemory()

    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    dateProvider = new DayjsDateProvider()

    devolutionRentalUseCase = new DevolutionRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dateProvider
    )

    user = await usersRepositoryInMemory.create({
      name: 'Name user',
      email: 'email@mail.com',
      password: 'ThisISaSenha',
      username: 'user1',
      driverLicense: 'QWER1212'
    })

    category = await categoriesRepositoryInMemory.create({
      name: 'Name category',
      description: 'Description category'
    })

    car = await carsRepositoryInMemory.create({
      name: 'Name car',
      brand: 'Brand',
      dailyRate: 50,
      description: 'Description car',
      fineAmount: 40,
      licensePlate: '123-ASDF',
      categoryId: category.id
    })

    rental = await rentalsRepositoryInMemory.create({
      carId: car.id,
      userId: user.id,
      expectedReturnDate: dateProvider.add48HoursToNow()
    })
  })

  it('should be able to devolution a rental', async () => {
    devolution = await devolutionRentalUseCase.execute({
      rentalId: rental.id
    })

    const carAvailable = await carsRepositoryInMemory.findById(car.id)

    expect(devolution).toHaveProperty('id')
    expect(devolution.endDate).not.toBeNull()
    if (carAvailable) {
      expect(carAvailable.available).toBeTruthy()
    }
  })

  it('should not be able to devolution a non-existent rental', async () => {
    expect(
      devolutionRentalUseCase.execute({
        rentalId: 'false1234'
      })
    ).rejects.toEqual(new AppError('Rental does not exist'))
  })

  it('should not be able to return a rental that already been returned', async () => {
    await devolutionRentalUseCase.execute({
      rentalId: rental.id
    })

    await expect(
      devolutionRentalUseCase.execute({
        rentalId: rental.id
      })
    ).rejects.toEqual(new AppError('Rental is already devolution'))
  })

  it('should not be able to return a rental with a non-existent car', async () => {
    rental.carId = 'falsse123'

    await rentalsRepositoryInMemory.save(rental)

    await expect(
      devolutionRentalUseCase.execute({
        rentalId: rental.id
      })
    ).rejects.toEqual(new AppError('Car does not exist'))
  })
})
