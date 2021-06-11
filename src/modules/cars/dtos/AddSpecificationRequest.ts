import { Car, Specification } from '../infra/typeorm/entities'

export interface AddSpecificationRequest {
  car: Car
  specification: Specification
}
