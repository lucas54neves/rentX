import { CategoryCreationRequest } from '../dtos'
import { Category } from '../model'
import { ISpecificationsRepository } from './ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Category[]

  constructor() {
    this.specifications = []
  }

  create({ name, description }: CategoryCreationRequest): Category {
    const category = new Category(name, description)

    this.specifications.push(category)

    return category
  }

  list(): Category[] {
    return this.specifications
  }

  findByName(name: string): Category | undefined {
    return this.specifications.find((category) => category.name === name)
  }
}