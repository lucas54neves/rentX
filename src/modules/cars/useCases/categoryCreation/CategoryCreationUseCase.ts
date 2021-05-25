import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors'

import { CategoryCreationRequest } from '../../dtos'
import { CategoriesRepository } from '../../repositories'

@injectable()
class CategoryCreationUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute({ name, description }: CategoryCreationRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    )

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!')
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CategoryCreationUseCase }
