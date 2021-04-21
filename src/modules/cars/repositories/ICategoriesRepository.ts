import { Category } from '../model'
import { CategoryCreationRequest } from '../dtos'

export interface ICategoriesRepository {
  findByName(name: string): Category | undefined
  list(): Category[]
  create({ name, description }: CategoryCreationRequest): void
}
