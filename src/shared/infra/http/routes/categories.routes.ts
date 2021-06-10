import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { CategoryListingController } from '@modules/cars/useCases/categoryListing/CategoryListingController'
import {
  ensureAdmin,
  ensureAuthenticated
} from '@shared/infra/http/middlewares'

const upload = multer({
  dest: './tmp',
  limits: {
    fileSize: 8000000 // Compliant: 8MB
  }
})

const categoriesRoutes = Router()

const categoryCreationController = new CreateCategoryController()

const importCategoryController = new ImportCategoryController()

const categoryListingController = new CategoryListingController()

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  categoryCreationController.handle
)

categoriesRoutes.get('/', categoryListingController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
)

export { categoriesRoutes }
