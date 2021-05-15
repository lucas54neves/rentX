import { Specification } from '../../entities'
import { ISpecificationsRepository } from '../../repositories'

export class SpecificationListingUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list()
  }
}
