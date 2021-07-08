import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { CreateRentalRequestInterface } from '@modules/rentals/dtos'
import { Rental } from '@modules/rentals/infra/typeorm/entities'
import { RentalsRepositoryInterface } from '@modules/rentals/repositories'
import { AppError } from '@shared/errors'
import { DateProviderInterface } from '@shared/container/providers/DateProvider/DateProviderInterface'
import { inject, injectable } from 'tsyringe'
import rentalConfig from '@config/rental'
import { CarsRepositoryInterface } from '@modules/cars/repositories'

dayjs.extend(utc)

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: RentalsRepositoryInterface,
    @inject('DayjsDateProvider')
    private dateProvider: DateProviderInterface,
    @inject('CarsRepository')
    private carsRepository: CarsRepositoryInterface
  ) {}

  async execute({
    userId,
    carId,
    expectedReturnDate
  }: CreateRentalRequestInterface): Promise<Rental> {
    const minimumHour = rentalConfig.minimumDuration

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId
    )

    if (carUnavailable) {
      throw new AppError('Car is unavailable')
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      userId
    )

    if (rentalOpenToUser) {
      throw new AppError(`There's a rental in progress for user`)
    }

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expectedReturnDate
    )

    if (compare < minimumHour) {
      throw new AppError(`Invalid return time`)
    }

    const rental = this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate
    })

    await this.carsRepository.updateAvailable({ id: carId, available: false })

    return rental
  }
}

export { CreateRentalUseCase }
