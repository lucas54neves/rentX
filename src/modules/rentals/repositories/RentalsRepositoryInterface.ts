import { CreateRentalRequestInterface } from '../dtos'
import { Rental } from '../infra/typeorm/entities'

interface RentalsRepositoryInterface {
  create(date: CreateRentalRequestInterface): Promise<Rental>
  save(rental: Rental): Promise<void>
  findOpenRentalByCar(carId: string): Promise<Rental | undefined>
  findOpenRentalByUser(userId: string): Promise<Rental | undefined>
}

export { RentalsRepositoryInterface }
