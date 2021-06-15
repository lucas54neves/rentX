import {
  AddSpecificationRequest,
  CreateCarRequest,
  ListAvailableCarsRequest,
  FindSpecificationInCarsRepositoryRequest
} from '../dtos'
import { Car, Specification } from '../infra/typeorm/entities'

interface CarsRepositoryInterface {
  create(data: CreateCarRequest): Promise<Car>
  save(car: Car): Promise<void>
  findById(id: string): Promise<Car | undefined>
  findByLincensePlate(licensePlate: string): Promise<Car | undefined>
  findAvailable(data: ListAvailableCarsRequest): Promise<Car[]>
  findSpecification(
    data: FindSpecificationInCarsRepositoryRequest
  ): Specification | null
  addSpecification(data: AddSpecificationRequest): Promise<Specification>
}

export { CarsRepositoryInterface }
