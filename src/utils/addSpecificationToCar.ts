import { AddSpecificationRequest } from '@modules/cars/dtos'
import { Car } from '@modules/cars/infra/typeorm/entities'

export function addSpecificationToCar({
  car,
  specification
}: AddSpecificationRequest): Car {
  if (car.specifications) {
    car.specifications.push(specification)
  } else {
    car.specifications = [specification]
  }

  return car
}
