import { SpecificationsRepository } from '../../repositories'
import { SpecificationListingController } from './SpecificationListingController'
import { SpecificationListingUseCase } from './SpecificationListingUseCase'

export default (): SpecificationListingController => {
  const specificationsRepository = new SpecificationsRepository()

  const specificationListingUseCase = new SpecificationListingUseCase(
    specificationsRepository
  )

  return new SpecificationListingController(specificationListingUseCase)
}
