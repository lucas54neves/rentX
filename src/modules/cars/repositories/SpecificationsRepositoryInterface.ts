import { Specification } from '../infra/typeorm/entities'
import { CreateSpecificationRequest } from '../dtos'

export interface SpecificationsRepositoryInterface {
  create({
    name,
    description
  }: CreateSpecificationRequest): Promise<Specification>
  save(specification: Specification): Promise<void>
  list(): Promise<Specification[]>
  findByIds(ids: string[]): Promise<Specification[]>
  findByName(name: string): Promise<Specification | undefined>
}
