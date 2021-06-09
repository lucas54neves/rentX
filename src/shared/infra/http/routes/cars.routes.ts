import { Router } from 'express'

import { CarCreationController } from '@modules/cars/useCases/carCreation/CarCreationController'
import {
  ensureAdmin,
  ensureAuthenticated
} from '@shared/infra/http/middlewares'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'

const carsRoutes = Router()

const carCreationController = new CarCreationController()

const listAvailableCarsController = new ListAvailableCarsController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  carCreationController.handle
)

carsRoutes.get('/available', listAvailableCarsController.handle)

export { carsRoutes }
