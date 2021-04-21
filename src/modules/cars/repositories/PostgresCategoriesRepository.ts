import { Category } from '../model'
import { CategoriesRepository, CategoryCreationRequest } from '../dtos'

export class PostgresCategoriesRepository implements CategoriesRepository {
  findByName(name: string): Category {
    throw new Error('Method not implemented.')
  }

  list(): Category[] {
    throw new Error('Method not implemented.')
  }

  create({ name, description }: CategoryCreationRequest): void {
    throw new Error('Method not implemented.')
  }
}
