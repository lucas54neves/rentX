import { SpecificationsRepository } from '../../repositories'
import { SpecificationCreationController } from './SpecificationCreationController'
import { SpecificationCreationUseCase } from './SpecificationCreationUseCase'

export default (): SpecificationCreationController => {
  const specificationsRepository = new SpecificationsRepository()

  const specificationCreationUseCase = new SpecificationCreationUseCase(
    specificationsRepository
  )

  return new SpecificationCreationController(specificationCreationUseCase)
}
