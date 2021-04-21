import { Specification } from '../../model'
import { ISpecificationsRepository } from '../../repositories'

export class SpecificationListingUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute(): Specification[] {
    return this.specificationsRepository.list()
  }
}
