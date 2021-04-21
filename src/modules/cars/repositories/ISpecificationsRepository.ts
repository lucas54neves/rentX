import { Specification } from '../model'
import { SpecificationCreationRequest } from '../dtos'

export interface ISpecificationsRepository {
  findByName(name: string): Specification | undefined
  list(): Specification[]
  create({ name, description }: SpecificationCreationRequest): void
}
