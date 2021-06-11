import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import {
  ensureAdmin,
  ensureAuthenticated
} from '@shared/infra/http/middlewares'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'

const carsRoutes = Router()

const createCarController = new CreateCarController()

const listAvailableCarsController = new ListAvailableCarsController()

const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
)

export { carsRoutes }
