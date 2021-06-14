import { CreateCategoryRequest } from '../dtos'
import { Category } from '../infra/typeorm/entities'

export interface CategoriesRepositoryInterface {
  create({ name, description }: CreateCategoryRequest): Promise<Category>
  save(category: Category): Promise<void>
  list(): Promise<Category[]>
  findByName(name: string): Promise<Category | undefined>
}
