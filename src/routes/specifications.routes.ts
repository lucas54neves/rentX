import { Request, Response, Router } from 'express'

import { specificationCreationController } from '../modules/cars/useCases/specificationCreation'
import { specificationListingController } from '../modules/cars/useCases/specificationListing'

const specificationsRoutes = Router()

specificationsRoutes.post('/', (request: Request, response: Response) => {
  return specificationCreationController.handle(request, response)
})

specificationsRoutes.get('/', (request: Request, response: Response) => {
  return specificationListingController.handle(request, response)
})

export { specificationsRoutes }
