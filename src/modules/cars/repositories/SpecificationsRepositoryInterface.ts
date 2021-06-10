import { Specification } from '../infra/typeorm/entities'
import { CreateSpecificationRequest } from '../dtos'

export interface SpecificationsRepositoryInterface {
  create({ name, description }: CreateSpecificationRequest): Promise<void>
  save(specification: Specification): Promise<void>
  list(): Promise<Specification[]>
  findByName(name: string): Promise<Specification | undefined>
}
