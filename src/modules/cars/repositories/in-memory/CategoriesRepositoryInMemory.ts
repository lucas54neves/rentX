import { CategoryCreationRequest } from '@modules/cars/dtos'
import { Category } from '@modules/cars/infra/typeorm/entities'
import { ICategoriesRepository } from '../ICategoriesRepository'

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
  }

  async create({ name, description }: CategoryCreationRequest): Promise<void> {
    const category = new Category(name, description)

    this.save(category)
  }

  async save(category: Category): Promise<void> {
    this.categories.push(category)
  }

  async list(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find((category) => category.name === name)
  }
}

export { CategoriesRepositoryInMemory }
