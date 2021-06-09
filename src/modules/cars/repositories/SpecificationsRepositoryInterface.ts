import { Specification } from '../infra/typeorm/entities'
import { SpecificationCreationRequest } from '../dtos'

export interface SpecificationsRepositoryInterface {
  create({ name, description }: SpecificationCreationRequest): Promise<void>
  save(specification: Specification): Promise<void>
  list(): Promise<Specification[]>
  findByName(name: string): Promise<Specification | undefined>
}
