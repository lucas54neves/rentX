import { CategoriesRepository } from '../../repositories'
import { CategoryCreationController } from './CategoryCreationController'
import { CategoryCreationUseCase } from './CategoryCreationUseCase'

const categoriesRepository = CategoriesRepository.getInstance()

const categoryCreationUseCase = new CategoryCreationUseCase(
  categoriesRepository
)

const categoryCreationController = new CategoryCreationController(
  categoryCreationUseCase
)

export { categoryCreationController }
