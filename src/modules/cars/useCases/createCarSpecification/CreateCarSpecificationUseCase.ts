import { inject, injectable } from 'tsyringe'

import { CreateCarSpecificationRequest } from '@modules/cars/dtos'
import {
  CarsRepositoryInterface,
  SpecificationsRepositoryInterface
} from '@modules/cars/repositories'
import { AppError } from '@shared/errors'
import { Car } from '@modules/cars/infra/typeorm/entities'

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: CarsRepositoryInterface,
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationsRepositoryInterface
  ) {}

  async execute({
    carId,
    specificationsId
  }: CreateCarSpecificationRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(carId)

    if (!carExists) {
      throw new AppError('Car does not exists')
    }

    const specifications = await this.specificationsRepository.findByIds(
      specificationsId
    )

    for (let specification of specifications) {
      const specificationAlreadyAdded =
        await this.carsRepository.findSpecification({
          car: carExists,
          specificationId: specification.id
        })

      if (!specificationAlreadyAdded) {
        await this.carsRepository.addSpecification({
          car: carExists,
          specification
        })
      }
    }

    await this.carsRepository.save(carExists)

    return carExists
  }
}

export { CreateCarSpecificationUseCase }
