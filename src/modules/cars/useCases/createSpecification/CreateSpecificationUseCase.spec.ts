import { CreateSpecificationRequest } from '@modules/cars/dtos'
import { SpecificationsRespositoryInMemory } from '@modules/cars/repositories'
import { AppError } from '@shared/errors'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

let specificationsRespositoryInMemory: SpecificationsRespositoryInMemory

let createSpecificationUseCase: CreateSpecificationUseCase

let testSpecifications: CreateSpecificationRequest[]

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

    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRespositoryInMemory
    )
  })

  it('should be able to create a new specification', async () => {
    await createSpecificationUseCase.execute({
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
      await createSpecificationUseCase.execute({
        name: testSpecifications[0].name,
        description: testSpecifications[0].description
      })

      await createSpecificationUseCase.execute({
        name: testSpecifications[1].name,
        description: testSpecifications[1].description
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
