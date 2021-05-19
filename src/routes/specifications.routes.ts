import { Router } from 'express'

import { SpecificationCreationController } from '../modules/cars/useCases/specificationCreation/SpecificationCreationController'
import { SpecificationListingController } from '../modules/cars/useCases/specificationListing/SpecificationListingController'

const specificationsRoutes = Router()

const specificationCreationController = new SpecificationCreationController()
const specificationListingController = new SpecificationListingController()

specificationsRoutes.post('/', specificationCreationController.handle)

specificationsRoutes.get('/', specificationListingController.handle)

export { specificationsRoutes }
