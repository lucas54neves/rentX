import { CategoryCreationRequest } from '../dtos'
import { Category } from '../infra/typeorm/entities'

export interface CategoriesRepositoryInterface {
  create({ name, description }: CategoryCreationRequest): Promise<void>
  save(category: Category): Promise<void>
  list(): Promise<Category[]>
  findByName(name: string): Promise<Category | undefined>
}
