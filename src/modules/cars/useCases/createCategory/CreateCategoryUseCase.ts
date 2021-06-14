import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'
import { CreateCategoryRequest } from '@modules/cars/dtos'
import { CategoriesRepositoryInterface } from '@modules/cars/repositories'
import { Category } from '@modules/cars/infra/typeorm/entities'

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepositoryInterface
  ) {}

  async execute({
    name,
    description
  }: CreateCategoryRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    )

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists')
    }

    return this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
