import { CategoriesRepository } from '../../repositories'
import { CategoryListingController } from './CategoryListingController'
import { CategoryListingUseCase } from './CategoryListingUseCase'

const categoriesRepository = new CategoriesRepository()

const categoryListingUseCase = new CategoryListingUseCase(categoriesRepository)

const categoryListingController = new CategoryListingController(
  categoryListingUseCase
)

export { categoryListingController }
