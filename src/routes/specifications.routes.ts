import { Request, Response, Router } from 'express'

import { SpecificationsRepository } from '../modules/cars/repositories'
import { specificationCreationController } from '../modules/cars/useCases/specificationCreation'

const specificationsRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.post('/', (request: Request, response: Response) => {
  return specificationCreationController.handle(request, response)
})

specificationsRoutes.get('/', (request: Request, response: Response) => {
  const allSpecifications = specificationsRepository.list()

  return response.json(allSpecifications)
})

export { specificationsRoutes }
