import { inject, injectable } from 'tsyringe'

import rentalConfig from '@config/rental'
import { CarsRepositoryInterface } from '@modules/cars/repositories'
import { DevolutionRentalUseCaseRequestInterface } from '@modules/rentals/dtos/DevolutionRentalUseCaseRequestInterface'
import { Rental } from '@modules/rentals/infra/typeorm/entities'
import { RentalsRepositoryInterface } from '@modules/rentals/repositories'
import { DateProviderInterface } from '@shared/container/providers/DateProvider/DateProviderInterface'
import { AppError } from '@shared/errors'

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: RentalsRepositoryInterface,
    @inject('CarsRepository')
    private carsRepository: CarsRepositoryInterface,
    @inject('DayjsDateProvider')
    private dateProvider: DateProviderInterface
  ) {}

  async execute({
    rentalId
  }: DevolutionRentalUseCaseRequestInterface): Promise<Rental> {
    const minimumDaily = rentalConfig.minimumDuration.days

    const rental = await this.rentalsRepository.findById(rentalId)

    if (!rental) {
      throw new AppError('Rental does not exist')
    }

    if (rental.endDate) {
      throw new AppError('Rental is already devolution')
    }

    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(rental.startDate, dateNow)

    if (daily < minimumDaily) {
      daily = minimumDaily
    }

    const car = await this.carsRepository.findById(rental.carId)

    if (!car) {
      throw new AppError('Car does not exist')
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expectedReturnDate
    )

    let total = 0

    if (delay > 0) {
      total += delay * car.fineAmount
    }

    total += daily * car.dailyRate

    rental.endDate = dateNow

    rental.total = total

    await this.rentalsRepository.save(rental)

    await this.carsRepository.updateAvailable({ id: car.id, available: true })

    return rental
  }
}

export { DevolutionRentalUseCase }
