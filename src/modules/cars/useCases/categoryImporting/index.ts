import { CategoriesRepository } from '../../repositories'
import { CategoryImportingController } from './CategoryImportingController'
import { CategoryImportingUseCase } from './CategoryImportingUseCase'

export default (): CategoryImportingController => {
  const categoriesRepository = new CategoriesRepository()

  const categoryImportingUseCase = new CategoryImportingUseCase(
    categoriesRepository
  )

  return new CategoryImportingController(categoryImportingUseCase)
}
