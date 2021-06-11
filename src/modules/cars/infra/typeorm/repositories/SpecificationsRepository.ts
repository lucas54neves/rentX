import { getRepository, Repository } from 'typeorm'

import { CreateSpecificationRequest } from '@modules/cars/dtos'
import { Specification } from '@modules/cars/infra/typeorm/entities'
import { SpecificationsRepositoryInterface } from '@modules/cars/repositories'

class SpecificationsRepository implements SpecificationsRepositoryInterface {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({
    name,
    description
  }: CreateSpecificationRequest): Promise<Specification> {
    const specification = this.repository.create({ name, description })

    await this.save(specification)

    return specification
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

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids)
  }
}

export { SpecificationsRepository }
