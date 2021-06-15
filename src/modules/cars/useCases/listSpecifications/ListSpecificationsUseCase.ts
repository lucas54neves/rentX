import { inject, injectable } from 'tsyringe'

import { Specification } from '@modules/cars/infra/typeorm/entities'
import { SpecificationsRepositoryInterface } from '@modules/cars/repositories'

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationsRepositoryInterface
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list()
  }
}

export { ListSpecificationsUseCase }
