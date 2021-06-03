import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'
import { SpecificationCreationRequest } from '@modules/cars/dtos'
import { ISpecificationsRepository } from '@modules/cars/repositories'

@injectable()
class SpecificationCreationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({
    name,
    description
  }: SpecificationCreationRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists')
    }

    await this.specificationsRepository.create({ name, description })
  }
}

export { SpecificationCreationUseCase }
