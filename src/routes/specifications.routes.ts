import { Request, Response, Router } from 'express'
import { SpecificationsRepository } from '../modules/cars/repositories'
import { SpecificationCreationUseCase } from '../modules/cars/useCases/createSpecification'

const specificationsRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body

  const specificationCreationService = new SpecificationCreationUseCase(specificationsRepository)

  try {
    specificationCreationService.execute({ name, description })
  } catch (error) {
    return response.status(400).json({ message: error.message })
  }

  return response.status(201).send()
})

specificationsRoutes.get('/', (request: Request, response: Response) => {
  const allSpecifications = specificationsRepository.list()

  return response.json(allSpecifications)
})

export { specificationsRoutes }
