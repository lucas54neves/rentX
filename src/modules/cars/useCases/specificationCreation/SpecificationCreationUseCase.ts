import { inject, injectable } from 'tsyringe'
import { SpecificationCreationRequest } from '../../dtos'
import { SpecificationsRepository } from '../../repositories'

@injectable()
class SpecificationCreationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationsRepository
  ) {}

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

export { SpecificationCreationUseCase }
