import { SpecificationCreationRequest } from '../../dtos'
import { SpecificationsRepository } from '../../repositories'

export class SpecificationCreationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute({ name, description }: SpecificationCreationRequest) {
    const specificationAlreadyExists = this.specificationsRepository.findByName(
      name
    )

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!')
    }

    this.specificationsRepository.create({ name, description })
  }
}
