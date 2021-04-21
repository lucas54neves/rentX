import { Category } from '../model'
import { CategoryCreationRequest } from './CategoryCreationRequest'

export type ICategoriesRepository = {
  findByName(name: string): Category | undefined
  list(): Category[]
  create({ name, description }: CategoryCreationRequest): void
}
