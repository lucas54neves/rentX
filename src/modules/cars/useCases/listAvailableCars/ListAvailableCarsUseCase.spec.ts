import { CreateCarRequest } from '@modules/cars/dtos'
import { Car } from '@modules/cars/infra/typeorm/entities'
import { CarsRepositoryInMemory } from '@modules/cars/repositories'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase

let carsRepositoryInMemory: CarsRepositoryInMemory

let testCars: CreateCarRequest[]

describe('Car listing', () => {
  beforeAll(() => {
    testCars = [
      {
        name: 'Audi A2',
        description: 'A new car',
        dailyRate: 110,
        licensePlate: 'BGT-1856',
        fineAmount: 50,
        brand: 'Audi',
        categoryId: 'c4d98d4a-796c-44db-95c7-e8b16e85967f'
      },
      {
        name: 'Audi A3',
        description: 'A new car',
        dailyRate: 150,
        licensePlate: 'BGT-2856',
        fineAmount: 80,
        brand: 'Audi',
        categoryId: 'c4d98d4a-796c-44db-95c7-e8b16e85967f'
      },
      {
        name: 'Audi A4',
        description: 'A new car',
        dailyRate: 170,
        licensePlate: 'BGT-3856',
        fineAmount: 120,
        brand: 'Audi',
        categoryId: 'c4d98d4a-796c-44db-95c7-e8b16e85967f'
      }
    ]
  })

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()

    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
  })

  it('should be able to list all available cars', async () => {
    const cars: Car[] = []

    testCars.forEach(async (car: CreateCarRequest) => {
      cars.push(await carsRepositoryInMemory.create(car))
    })

    const carsAvailable = await listAvailableCarsUseCase.execute({})

    expect(carsAvailable).toEqual(cars)
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create(testCars[0])

    const cars = await listAvailableCarsUseCase.execute({
      name: testCars[0].name
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create(testCars[0])

    const cars = await listAvailableCarsUseCase.execute({
      brand: testCars[0].brand
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by categoryId', async () => {
    const car = await carsRepositoryInMemory.create(testCars[0])

    const cars = await listAvailableCarsUseCase.execute({
      categoryId: testCars[0].categoryId
    })

    expect(cars).toEqual([car])
  })
})
