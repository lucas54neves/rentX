import { inject, injectable } from 'tsyringe'

import { Category } from '@modules/cars/infra/typeorm/entities'
import { CategoriesRepositoryInterface } from '@modules/cars/repositories'

@injectable()
class CategoryListingUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepositoryInterface
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list()
  }
}

export { CategoryListingUseCase }
