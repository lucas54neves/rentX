import { CreateSpecificationRequest } from '@modules/cars/dtos'
import { Specification } from '@modules/cars/infra/typeorm/entities'
import { SpecificationsRepositoryInterface } from '../SpecificationsRepositoryInterface'

class SpecificationsRespositoryInMemory
  implements SpecificationsRepositoryInterface
{
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  async create({
    name,
    description
  }: CreateSpecificationRequest): Promise<Specification> {
    const specification = new Specification(name, description)

    await this.save(specification)

    return specification
  }

  async save(specification: Specification): Promise<void> {
    this.specifications.push(specification)
  }

  async list(): Promise<Specification[]> {
    return this.specifications
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    )
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(
      (specification) => specification.name === name
    )
  }
}

export { SpecificationsRespositoryInMemory }
