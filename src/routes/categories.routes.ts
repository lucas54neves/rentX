import { Request, Response, Router } from 'express'
import { CategoriesRepository } from '../repositories/CategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body

  const createCategoryService = new CreateCategoryService(categoriesRepository)

  try {
    createCategoryService.execute({ name, description })
  } catch (error) {
    return response.status(400).json({ message: error.message })
  }

  return response.status(201).send()
})

categoriesRoutes.get('/', (request: Request, response: Response) => {
  const allCategories = categoriesRepository.list()

  return response.json(allCategories)
})

export { categoriesRoutes }
