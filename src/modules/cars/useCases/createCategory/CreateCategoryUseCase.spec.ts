import { AppError } from '@shared/errors'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { CreateCategoryRequest } from '@modules/cars/dtos'

let categoryCreationUseCase: CreateCategoryUseCase

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

let testCategories: CreateCategoryRequest[]

describe('Category creation', () => {
  beforeAll(() => {
    testCategories = [
      {
        name: 'Category Test',
        description: 'Category description test 1'
      },
      {
        name: 'Category Test',
        description: 'Category description test 2'
      }
    ]
  })

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    categoryCreationUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
    await categoryCreationUseCase.execute({
      name: testCategories[0].name,
      description: testCategories[0].description
    })

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      testCategories[0].name
    )

    expect(categoryCreated).toHaveProperty('id')
  })

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      await categoryCreationUseCase.execute({
        name: testCategories[0].name,
        description: testCategories[0].description
      })

      await categoryCreationUseCase.execute({
        name: testCategories[1].name,
        description: testCategories[1].description
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
