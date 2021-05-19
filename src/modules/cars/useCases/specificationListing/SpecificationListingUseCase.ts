import { inject, injectable } from 'tsyringe'
import { Specification } from '../../entities'
import { ISpecificationsRepository } from '../../repositories'

@injectable()
class SpecificationListingUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list()
  }
}

export { SpecificationListingUseCase }
