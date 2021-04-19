import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../model/Category'

export class CategoriesRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
  }

  create({ name, description }: ICreateCategoryDTO): Category {
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
