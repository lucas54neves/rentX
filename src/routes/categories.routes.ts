import { Request, Response, Router } from 'express'

import { categoryListingController } from '../modules/cars/useCases/categoryListing'
import { categoryCreationController } from '../modules/cars/useCases/createCategory'

const categoriesRoutes = Router()

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return categoryCreationController.handle(request, response)
})

categoriesRoutes.get('/', (request: Request, response: Response) => {
  return categoryListingController.handle(request, response)
})

export { categoriesRoutes }
