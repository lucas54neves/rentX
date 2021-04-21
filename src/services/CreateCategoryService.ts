import { CategoryCreationRequest } from '../dtos/CategoryCreationRequest'
import { CategoriesRepository } from '../repositories/CategoriesRepository'

export class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: CategoryCreationRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category already exists!')
    }

    this.categoriesRepository.create({ name, description })
  }
}
