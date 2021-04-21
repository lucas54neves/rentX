import { SpecificationsRepository } from '../../repositories'
import { SpecificationListingController } from './SpecificationListingController'
import { SpecificationListingUseCase } from './SpecificationListingUseCase'

const specificationsRepository = new SpecificationsRepository()

const specificationListingUseCase = new SpecificationListingUseCase(
  specificationsRepository
)

const specificationListingController = new SpecificationListingController(
  specificationListingUseCase
)

export { specificationListingController }
