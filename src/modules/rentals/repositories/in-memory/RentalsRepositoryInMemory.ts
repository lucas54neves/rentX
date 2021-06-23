import { CreateRentalRequestInterface } from '@modules/rentals/dtos'
import { Rental } from '@modules/rentals/infra/typeorm/entities'
import { RentalsRepositoryInterface } from '../RentalsRepositoryInterface'

class RentalsRepositoryInMemory implements RentalsRepositoryInterface {
  private repository: Rental[] = []

  async create({
    carId,
    userId,
    expectedReturnDate
  }: CreateRentalRequestInterface): Promise<Rental> {
    const rental = new Rental(carId, userId, expectedReturnDate)

    this.save(rental)

    return rental
  }

  async save(rental: Rental): Promise<void> {
    this.repository.push(rental)
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    return this.repository.find(
      (rental) => rental.carId === carId && rental.endDate === null
    )
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    return this.repository.find(
      (rental) => rental.userId === userId && rental.endDate === null
    )
  }
}

export { RentalsRepositoryInMemory }
