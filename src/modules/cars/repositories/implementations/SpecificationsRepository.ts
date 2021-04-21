import { SpecificationCreationRequest } from '../../dtos'
import { Specification } from '../../model'
import { ISpecificationsRepository } from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  create({ name, description }: SpecificationCreationRequest): Specification {
    const specification = new Specification(name, description)

    this.specifications.push(specification)

    return specification
  }

  list(): Specification[] {
    return this.specifications
  }

  findByName(name: string): Specification | undefined {
    return this.specifications.find(
      (specification) => specification.name === name
    )
  }
}
