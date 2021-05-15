import { Category } from '../entities'
import { CategoryCreationRequest } from '../dtos'

export interface ICategoriesRepository {
  create({ name, description }: CategoryCreationRequest): Promise<void>
  list(): Promise<Category[]>
  findByName(name: string): Promise<Category | undefined>
}
