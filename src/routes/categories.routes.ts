import { Request, Response, Router } from 'express'
import multer from 'multer'

import { categoryListingController } from '../modules/cars/useCases/categoryListing'
import { categoryCreationController } from '../modules/cars/useCases/categoryCreation'
import { categoryImportingController } from '../modules/cars/useCases/categoryImporting'

const upload = multer({
  dest: './tmp',
  limits: {
    fileSize: 8000000 // Compliant: 8MB
  }
})

const categoriesRoutes = Router()

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return categoryCreationController.handle(request, response)
})

categoriesRoutes.get('/', (request: Request, response: Response) => {
  return categoryListingController.handle(request, response)
})

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  (request: Request, response: Response) => {
    return categoryImportingController.handle(request, response)
  }
)

export { categoriesRoutes }
