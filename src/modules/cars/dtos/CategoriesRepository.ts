import { Category } from '../model'
import { CategoryCreationRequest } from './CategoryCreationRequest'

export type CategoriesRepository = {
  findByName(name: string): Category
  list(): Category[]
  create({ name, description }: CategoryCreationRequest): void
}
