import { getRepository, Repository } from 'typeorm'
import { CategoryCreationRequest } from '../../dtos'
import { Category } from '../../entities'
import { ICategoriesRepository } from '../ICategoriesRepository'

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
