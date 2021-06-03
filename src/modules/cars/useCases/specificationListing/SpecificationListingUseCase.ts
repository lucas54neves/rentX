import { inject, injectable } from 'tsyringe'

import { Specification } from '@modules/cars/infra/typeorm/entities'
import { ISpecificationsRepository } from '@modules/cars/repositories'

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
