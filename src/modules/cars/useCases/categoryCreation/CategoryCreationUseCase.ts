import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'
import { CategoryCreationRequest } from '@modules/cars/dtos'
import { ICategoriesRepository } from '@modules/cars/repositories'
import { Category } from '@modules/cars/infra/typeorm/entities'

@injectable()
class CategoryCreationUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: CategoryCreationRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    )

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists')
    }

    await this.categoriesRepository.create({ name, description })
  }
}

export { CategoryCreationUseCase }
