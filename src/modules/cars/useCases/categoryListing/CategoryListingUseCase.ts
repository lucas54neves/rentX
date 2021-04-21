import { Category } from 'modules/cars/model'
import { ICategoriesRepository } from 'modules/cars/repositories'

export class CategoryListingUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.list()
  }
}
