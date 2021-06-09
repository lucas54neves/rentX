import { CarCreationRequest, ListAvailableCarsRequest } from '../dtos'
import { Car } from '../infra/typeorm/entities'

interface CarsRepositoryInterface {
  create(data: CarCreationRequest): Promise<Car>
  save(car: Car): Promise<void>
  findByLincensePlate(licensePlate: string): Promise<Car | undefined>
  findAvailable(data: ListAvailableCarsRequest): Promise<Car[]>
}

export { CarsRepositoryInterface }
