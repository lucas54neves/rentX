import { CategoryCreationRequest } from '../../dtos'
import { CategoriesRepository } from '../../repositories'

export class CategoryCreationUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ name, description }: CategoryCreationRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    )

    if (categoryAlreadyExists) {
      throw new Error('Category already exists!')
    }

    this.categoriesRepository.create({ name, description })
  }
}
