import { Request, Response, Router } from 'express'

import { CategoriesRepository } from '../modules/cars/repositories'
import { categoryCreationController } from '../modules/cars/useCases/createCategory'

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return categoryCreationController.handle(request, response)
})

categoriesRoutes.get('/', (request: Request, response: Response) => {
  const allCategories = categoriesRepository.list()

  return response.json(allCategories)
})

export { categoriesRoutes }
