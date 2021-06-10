import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController'
import {
  ensureAdmin,
  ensureAuthenticated
} from '@shared/infra/http/middlewares'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

const listSpecificationsController = new ListSpecificationsController()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
)

specificationsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  listSpecificationsController.handle
)

export { specificationsRoutes }
