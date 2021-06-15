import { FindSpecificationInCarsRepositoryRequest } from '@modules/cars/dtos'
import { Specification } from '@modules/cars/infra/typeorm/entities'

export function findSpecificationFromCar({
  car,
  specificationId
}: FindSpecificationInCarsRepositoryRequest): Specification | null {
  if (!car.specifications) {
    return null
  }

  const specificationFound = car.specifications.find(
    (specification) => specification.id === specificationId
  )

  if (!specificationFound) {
    return null
  }

  return specificationFound
}
