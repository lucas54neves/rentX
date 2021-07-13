import { AppError } from '@shared/errors'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { CreateCategoryRequest } from '@modules/cars/dtos'

let categoryCreationUseCase: CreateCategoryUseCase

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Category creation', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    categoryCreationUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
    await categoryCreationUseCase.execute({
      name: 'Category Test',
      description: 'Category description test 1'
    })

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      'Category Test'
    )

    expect(categoryCreated).toHaveProperty('id')
    if (categoryCreated) {
      expect(categoryCreated.name).toBe('Category Test')
      expect(categoryCreated.description).toBe('Category description test 1')
    }
  })

  it('should not be able to create a new category with name exists', async () => {
    await categoryCreationUseCase.execute({
      name: 'Category Test',
      description: 'Category description test 1'
    })

    await expect(
      categoryCreationUseCase.execute({
        name: 'Category Test',
        description: 'Category description test 1'
      })
    ).rejects.toEqual(new AppError('Category already exists'))
  })
})
