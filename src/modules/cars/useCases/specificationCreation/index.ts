import { SpecificationsRepository } from '../../repositories'
import { SpecificationCreationController } from './SpecificationCreationController'
import { SpecificationCreationUseCase } from './SpecificationCreationUseCase'

const specificationsRepository = new SpecificationsRepository()

const specificationCreationUseCase = new SpecificationCreationUseCase(
  specificationsRepository
)

const specificationCreationController = new SpecificationCreationController(
  specificationCreationUseCase
)

export { specificationCreationController }
