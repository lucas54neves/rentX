import { CarCreationRequest } from '../dtos'
import { Car } from '../infra/typeorm/entities'

interface CarsRepositoryInterface {
  create(data: CarCreationRequest): Promise<Car>
  save(car: Car): Promise<void>
  findByLincensePlate(licensePlate: string): Promise<Car | undefined>
}

export { CarsRepositoryInterface }
