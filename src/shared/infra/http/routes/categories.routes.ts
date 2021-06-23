import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'
import { ensureAdmin, ensureAuthenticated } from '@shared/infra/http/middleware'

const upload = multer({
  dest: './tmp',
  limits: {
    fileSize: 8000000 // Compliant: 8MB
  }
})

const categoriesRoutes = Router()

const categoryCreationController = new CreateCategoryController()

const importCategoryController = new ImportCategoryController()

const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  categoryCreationController.handle
)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
)

export { categoriesRoutes }
