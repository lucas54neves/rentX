import { getRepository, Repository } from 'typeorm'

import { SpecificationCreationRequest } from '@modules/cars/dtos'
import { Specification } from '@modules/cars/infra/typeorm/entities'
import { ISpecificationsRepository } from '@modules/cars/repositories'

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

    await this.save(specification)
  }

  async save(specification: Specification): Promise<void> {
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
