import { inject, injectable } from 'tsyringe'
import { Category } from '../../entities'
import { ICategoriesRepository } from '../../repositories'

@injectable()
class CategoryListingUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list()
  }
}

export { CategoryListingUseCase }
