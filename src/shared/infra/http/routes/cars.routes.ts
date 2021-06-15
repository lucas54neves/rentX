import { Router } from 'express'
import multer from 'multer'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import {
  ensureAdmin,
  ensureAuthenticated
} from '@shared/infra/http/middlewares'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController'
import uploadConfig from '@config/upload'

const carsRoutes = Router()

const uploadImages = multer(uploadConfig.upload('./tmp/cars'))

const createCarController = new CreateCarController()

const listAvailableCarsController = new ListAvailableCarsController()

const createCarSpecificationController = new CreateCarSpecificationController()

const uploadCarImagesController = new UploadCarImageController()

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

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array('images'),
  uploadCarImagesController.handle
)

export { carsRoutes }
