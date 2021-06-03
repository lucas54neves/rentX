import { AppError } from '@shared/errors'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'
import { CategoryCreationUseCase } from './CategoryCreationUseCase'

let categoryCreationUseCase: CategoryCreationUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Category creation', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    categoryCreationUseCase = new CategoryCreationUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test'
    }

    await categoryCreationUseCase.execute({
      name: category.name,
      description: category.description
    })

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    )

    expect(categoryCreated).toHaveProperty('id')
  })

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category description test'
      }

      await categoryCreationUseCase.execute({
        name: category.name,
        description: category.description
      })

      await categoryCreationUseCase.execute({
        name: category.name,
        description: category.description
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
