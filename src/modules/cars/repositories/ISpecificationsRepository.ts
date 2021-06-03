import { Specification } from '../infra/typeorm/entities'
import { SpecificationCreationRequest } from '../dtos'

export interface ISpecificationsRepository {
  create({ name, description }: SpecificationCreationRequest): Promise<void>
  save(category: Specification): Promise<void>
  list(): Promise<Specification[]>
  findByName(name: string): Promise<Specification | undefined>
}
