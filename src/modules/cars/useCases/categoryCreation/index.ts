import { CategoriesRepository } from '../../repositories'
import { CategoryCreationController } from './CategoryCreationController'
import { CategoryCreationUseCase } from './CategoryCreationUseCase'

export default (): CategoryCreationController => {
  const categoriesRepository = new CategoriesRepository()

  const categoryCreationUseCase = new CategoryCreationUseCase(
    categoriesRepository
  )

  return new CategoryCreationController(categoryCreationUseCase)
}
