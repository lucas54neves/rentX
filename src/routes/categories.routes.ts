import { Request, Response, Router } from 'express'
import { CategoriesRepository } from '../modules/cars/repositories'
import { CategoryCreationUseCase } from '../modules/cars/useCases/createCategory'

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body

  const categoryCreationService = new CategoryCreationUseCase(categoriesRepository)

  try {
    categoryCreationService.execute({ name, description })
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
