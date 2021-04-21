import { Specification } from '../model'
import { SpecificationCreationRequest } from '../dtos'

export type ISpecificationsRepository = {
  findByName(name: string): Specification | undefined
  list(): Specification[]
  create({ name, description }: SpecificationCreationRequest): void
}
