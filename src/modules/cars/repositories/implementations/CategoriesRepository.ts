import { CategoryCreationRequest } from '../../dtos'
import { Category } from '../../model'
import { ICategoriesRepository } from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    return CategoriesRepository.INSTANCE
  }

  create({ name, description }: CategoryCreationRequest): Category {
    const category = new Category(name, description)

    this.categories.push(category)

    return category
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category | undefined {
    return this.categories.find((category) => category.name === name)
  }
}
