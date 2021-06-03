import { getRepository, Repository } from 'typeorm'

import { CategoryCreationRequest } from '@modules/cars/dtos'
import { Category } from '@modules/cars/infra/typeorm/entities'
import { ICategoriesRepository } from '@modules/cars/repositories'

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ name, description }: CategoryCreationRequest): Promise<void> {
    const category = this.repository.create({
      name,
      description
    })

    await this.save(category)
  }

  async save(category: Category): Promise<void> {
    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    return this.repository.find()
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name })
  }
}

export { CategoriesRepository }
