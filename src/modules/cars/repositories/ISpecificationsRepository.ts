import { Specification } from '../entities'
import { SpecificationCreationRequest } from '../dtos'

export interface ISpecificationsRepository {
  create({ name, description }: SpecificationCreationRequest): Promise<void>
  list(): Promise<Specification[]>
  findByName(name: string): Promise<Specification | undefined>
}
