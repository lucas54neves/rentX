import { CategoriesRepository } from '../../repositories'
import { CategoryImportingController } from './CategoryImportingController'
import { CategoryImportingUseCase } from './CategoryImportingUseCase'

const categoriesRepository = CategoriesRepository.getInstance()

const categoryImportingUseCase = new CategoryImportingUseCase(
  categoriesRepository
)

const categoryImportingController = new CategoryImportingController(
  categoryImportingUseCase
)

export { categoryImportingController }
