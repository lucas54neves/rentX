import { Category } from '../../entities'
import { ICategoriesRepository } from '../../repositories'

export class CategoryListingUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list()
  }
}
