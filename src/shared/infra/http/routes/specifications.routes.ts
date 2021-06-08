import { Router } from 'express'

import { SpecificationCreationController } from '@modules/cars/useCases/specificationCreation/SpecificationCreationController'
import { SpecificationListingController } from '@modules/cars/useCases/specificationListing/SpecificationListingController'
import {
  ensureAdmin,
  ensureAuthenticated
} from '@shared/infra/http/middlewares'

const specificationsRoutes = Router()

const specificationCreationController = new SpecificationCreationController()

const specificationListingController = new SpecificationListingController()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  specificationCreationController.handle
)

specificationsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  specificationListingController.handle
)

export { specificationsRoutes }
