import { Car } from '../infra/typeorm/entities'

export interface FindSpecificationInCarsRepositoryRequest {
  car: Car
  specificationId: string
}
