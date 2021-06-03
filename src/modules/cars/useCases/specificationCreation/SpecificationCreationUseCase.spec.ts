import { SpecificationCreationRequest } from '@modules/cars/dtos'
import { SpecificationsRespositoryInMemory } from '@modules/cars/repositories'
import { AppError } from '@shared/errors'
import { SpecificationCreationUseCase } from './SpecificationCreationUseCase'

let specificationsRespositoryInMemory: SpecificationsRespositoryInMemory

let specificationCreationUseCase: SpecificationCreationUseCase

let testSpecifications: SpecificationCreationRequest[]

describe('Specification creation', () => {
  beforeAll(() => {
    testSpecifications = [
      {
        name: 'Test specification',
        description: 'Test specification description 1'
      },
      {
        name: 'Test specification',
        description: 'Test specification description 2'
      }
    ]
  })

  beforeEach(() => {
    specificationsRespositoryInMemory = new SpecificationsRespositoryInMemory()

    specificationCreationUseCase = new SpecificationCreationUseCase(
      specificationsRespositoryInMemory
    )
  })

  it('should be able to create a new specification', async () => {
    await specificationCreationUseCase.execute({
      name: testSpecifications[0].name,
      description: testSpecifications[0].description
    })

    const specificationCreated =
      await specificationsRespositoryInMemory.findByName(
        testSpecifications[0].name
      )

    expect(specificationCreated).toHaveProperty('id')
  })

  it('should not be able to create a new specification with name exists', async () => {
    expect(async () => {
      await specificationCreationUseCase.execute({
        name: testSpecifications[0].name,
        description: testSpecifications[0].description
      })

      await specificationCreationUseCase.execute({
        name: testSpecifications[1].name,
        description: testSpecifications[1].description
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
