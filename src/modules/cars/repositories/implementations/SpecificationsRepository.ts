import { getRepository, Repository } from 'typeorm'
import { SpecificationCreationRequest } from '../../dtos'
import { Specification } from '../../entities'
import { ISpecificationsRepository } from '../ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({
    name,
    description
  }: SpecificationCreationRequest): Promise<void> {
    const specification = this.repository.create({ name, description })

    await this.repository.save(specification)
  }

  async list(): Promise<Specification[]> {
    return this.repository.find()
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.repository.findOne({ name })
  }
}

export { SpecificationsRepository }
