import { CategoryCreationRequest } from '../dtos'
import { Category } from '../model'
import { ICategoriesRepository } from './ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
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
