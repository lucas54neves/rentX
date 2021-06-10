import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { SpecificationListingController } from '@modules/cars/useCases/specificationListing/SpecificationListingController'
import {
  ensureAdmin,
  ensureAuthenticated
} from '@shared/infra/http/middlewares'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

const specificationListingController = new SpecificationListingController()

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
  specificationListingController.handle
)

export { specificationsRoutes }
