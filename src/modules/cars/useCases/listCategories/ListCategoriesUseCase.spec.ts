import { CategoriesRepositoryInMemory } from '@modules/cars/repositories'
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

type TestCategory = {
  name: string
  description: string
}

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

let listCategoriesUseCase: ListCategoriesUseCase

let categoryCreationUseCase: CreateCategoryUseCase

let testCategories: TestCategory[]

describe('Category listing', () => {
  beforeAll(() => {
    testCategories = [
      {
        name: 'Category Test1',
        description: 'Category description test'
      },
      {
        name: 'Category Test2',
        description: 'Category description test'
      },
      {
        name: 'Category Test3',
        description: 'Category description test'
      },
      {
        name: 'Category Test4',
        description: 'Category description test'
      },
      {
        name: 'Category Test5',
        description: 'Category description test'
      },
      {
        name: 'Category Test6',
        description: 'Category description test'
      },
      {
        name: 'Category Test7',
        description: 'Category description test'
      },
      {
        name: 'Category Test8',
        description: 'Category description test'
      },
      {
        name: 'Category Test9',
        description: 'Category description test'
      }
    ]
  })

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    categoryCreationUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )

    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('shoud be able to listing categories', async () => {
    testCategories.forEach(async (category: TestCategory) => {
      await categoryCreationUseCase.execute({
        name: category.name,
        description: category.description
      })
    })

    const categoriesCreated = await listCategoriesUseCase.execute()

    expect(categoriesCreated.length).toBe(testCategories.length)
  })
})
