import { CategoriesRepository } from '@modules/cars/repositories'
import { CategoryCreationController } from './CategoryCreationController'
import { CategoryCreationUseCase } from './CategoryCreationUseCase'

const categoriesRepository = new CategoriesRepository()

const categoryCreationUseCase = new CategoryCreationUseCase(
  categoriesRepository
)

const categoryCreationController = new CategoryCreationController(
  categoryCreationUseCase
)

export { categoryCreationController }
