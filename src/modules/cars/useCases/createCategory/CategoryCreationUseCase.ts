import { CategoryCreationRequest } from "../../dtos"
import { CategoriesRepository } from "../../repositories"

export class CategoryCreationUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: CategoryCreationRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category already exists!')
    }

    this.categoriesRepository.create({ name, description })
  }
}