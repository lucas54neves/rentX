import { Router } from 'express'

import { CarCreationController } from '@modules/cars/useCases/createCar/CarCreationController'

const carsRoutes = Router()

const carCreationController = new CarCreationController()

carsRoutes.post('/', carCreationController.handle)

export { carsRoutes }
