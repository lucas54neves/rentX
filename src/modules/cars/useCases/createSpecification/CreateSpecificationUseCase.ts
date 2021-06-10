import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'
import { CreateSpecificationRequest } from '@modules/cars/dtos'
import { SpecificationsRepositoryInterface } from '@modules/cars/repositories'

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationsRepositoryInterface
  ) {}

  async execute({
    name,
    description
  }: CreateSpecificationRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists')
    }

    await this.specificationsRepository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }
