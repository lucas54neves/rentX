import { SpecificationsRespositoryInMemory } from '@modules/cars/repositories'
import { CreateSpecificationUseCase } from '../createSpecification/CreateSpecificationUseCase'
import { SpecificationListingUseCase } from './SpecificationListingUseCase'

type TestSpecification = {
  name: string
  description: string
}

let specificationsRepositoryInMemory: SpecificationsRespositoryInMemory

let specificationListingUseCase: SpecificationListingUseCase

let createSpecificationUseCase: CreateSpecificationUseCase

let testSpecifications: TestSpecification[]

describe('Specification listing', () => {
  beforeAll(() => {
    testSpecifications = [
      {
        name: 'Specification Test1',
        description: 'Specification description test'
      },
      {
        name: 'Specification Test2',
        description: 'Specification description test'
      },
      {
        name: 'Specification Test3',
        description: 'Specification description test'
      },
      {
        name: 'Specification Test4',
        description: 'Specification description test'
      },
      {
        name: 'Specification Test5',
        description: 'Specification description test'
      },
      {
        name: 'Specification Test6',
        description: 'Specification description test'
      },
      {
        name: 'Specification Test7',
        description: 'Specification description test'
      },
      {
        name: 'Specification Test8',
        description: 'Specification description test'
      },
      {
        name: 'Specification Test9',
        description: 'Specification description test'
      }
    ]
  })

  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRespositoryInMemory()

    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory
    )

    specificationListingUseCase = new SpecificationListingUseCase(
      specificationsRepositoryInMemory
    )
  })

  it('should be able to listing specifications', async () => {
    testSpecifications.forEach(async (specification: TestSpecification) => {
      await createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description
      })
    })

    const specificationsCreated = await specificationListingUseCase.execute()

    expect(specificationsCreated.length).toBe(testSpecifications.length)
  })
})
