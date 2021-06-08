import { Router } from 'express'

import { CarCreationController } from '@modules/cars/useCases/createCar/CarCreationController'
import {
  ensureAdmin,
  ensureAuthenticated
} from '@shared/infra/http/middlewares'

const carsRoutes = Router()

const carCreationController = new CarCreationController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  carCreationController.handle
)

export { carsRoutes }
