import { CreateSpecificationRequest } from '@modules/cars/dtos'
import { SpecificationsRespositoryInMemory } from '@modules/cars/repositories'
import { AppError } from '@shared/errors'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

let specificationsRespositoryInMemory: SpecificationsRespositoryInMemory

let createSpecificationUseCase: CreateSpecificationUseCase

let testSpecifications: CreateSpecificationRequest[]

describe('Specification creation', () => {
  beforeEach(() => {
    specificationsRespositoryInMemory = new SpecificationsRespositoryInMemory()

    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRespositoryInMemory
    )
  })

  it('should be able to create a new specification', async () => {
    await createSpecificationUseCase.execute({
      name: 'Test specification',
      description: 'Test specification description 1'
    })

    const specificationCreated =
      await specificationsRespositoryInMemory.findByName('Test specification')

    expect(specificationCreated).toHaveProperty('id')
    if (specificationCreated) {
      expect(specificationCreated.name).toBe('Test specification')
      expect(specificationCreated.description).toBe(
        'Test specification description 1'
      )
    }
  })

  it('should not be able to create a new specification with name exists', async () => {
    await createSpecificationUseCase.execute({
      name: 'Test specification',
      description: 'Test specification description 1'
    })
    await expect(
      createSpecificationUseCase.execute({
        name: 'Test specification',
        description: 'Test specification description 1'
      })
    ).rejects.toEqual(new AppError('Specification already exists'))
  })
})
