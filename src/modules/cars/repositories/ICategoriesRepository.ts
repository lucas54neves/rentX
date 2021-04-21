import { Category } from '../model'
import { CategoryCreationRequest } from '../dtos'

export type ICategoriesRepository = {
  findByName(name: string): Category | undefined
  list(): Category[]
  create({ name, description }: CategoryCreationRequest): void
}
