import {
  AddSpecificationRequest,
  CreateCarRequest,
  ListAvailableCarsRequest,
  FindSpecificationInCarsRepositoryRequest,
  UpdateAvailableRequest
} from '../dtos'
import { Car, Specification } from '../infra/typeorm/entities'

interface CarsRepositoryInterface {
  create(data: CreateCarRequest): Promise<Car>
  save(car: Car): Promise<void>
  findById(id: string): Promise<Car | undefined>
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>
  findAvailable(data: ListAvailableCarsRequest): Promise<Car[]>
  findSpecification(
    data: FindSpecificationInCarsRepositoryRequest
  ): Specification | null
  addSpecification(data: AddSpecificationRequest): Promise<Specification>
  updateAvailable(data: UpdateAvailableRequest): Promise<void>
}

export { CarsRepositoryInterface }
