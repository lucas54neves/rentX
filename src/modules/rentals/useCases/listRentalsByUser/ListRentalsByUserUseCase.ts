import { Rental } from '@modules/rentals/infra/typeorm/entities'
import { RentalsRepositoryInterface } from '@modules/rentals/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: RentalsRepositoryInterface
  ) {}

  async execute(userId: string): Promise<Rental[] | undefined> {
    return this.rentalsRepository.findByUserId(userId)
  }
}

export { ListRentalsByUserUseCase }
