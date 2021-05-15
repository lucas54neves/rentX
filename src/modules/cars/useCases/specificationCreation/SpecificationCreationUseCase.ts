import { SpecificationCreationRequest } from '../../dtos'
import { SpecificationsRepository } from '../../repositories'

export class SpecificationCreationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  async execute({
    name,
    description
  }: SpecificationCreationRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!')
    }

    await this.specificationsRepository.create({ name, description })
  }
}
