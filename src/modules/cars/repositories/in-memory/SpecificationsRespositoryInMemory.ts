import { SpecificationCreationRequest } from '@modules/cars/dtos'
import { Specification } from '@modules/cars/infra/typeorm/entities'
import { ISpecificationsRepository } from '../ISpecificationsRepository'

class SpecificationsRespositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  async create({
    name,
    description
  }: SpecificationCreationRequest): Promise<void> {
    const specification = new Specification(name, description)

    await this.save(specification)
  }

  async save(specification: Specification): Promise<void> {
    this.specifications.push(specification)
  }

  async list(): Promise<Specification[]> {
    return this.specifications
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(
      (specification) => specification.name === name
    )
  }
}

export { SpecificationsRespositoryInMemory }
