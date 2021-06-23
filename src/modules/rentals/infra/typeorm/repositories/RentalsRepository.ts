import { CreateRentalRequestInterface } from '@modules/rentals/dtos'
import { RentalsRepositoryInterface } from '@modules/rentals/repositories'
import { getRepository, Repository } from 'typeorm'
import { Rental } from '../entities'

class RentalsRepository implements RentalsRepositoryInterface {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create({
    userId,
    carId,
    expectedReturnDate
  }: CreateRentalRequestInterface): Promise<Rental> {
    const rental = this.repository.create({
      userId,
      carId,
      expectedReturnDate
    })

    await this.save(rental)

    return rental
  }

  async save(rental: Rental): Promise<void> {
    await this.repository.save(rental)
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    return this.repository.findOne({ carId })
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    return this.repository.findOne({ userId })
  }
}

export { RentalsRepository }
