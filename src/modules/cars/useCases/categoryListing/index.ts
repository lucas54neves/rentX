import { CategoriesRepository } from '../../repositories'
import { CategoryListingController } from './CategoryListingController'
import { CategoryListingUseCase } from './CategoryListingUseCase'

export default () => {
  const categoriesRepository = new CategoriesRepository()

  const categoryListingUseCase = new CategoryListingUseCase(
    categoriesRepository
  )

  return new CategoryListingController(categoryListingUseCase)
}
