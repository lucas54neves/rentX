import { UserCreationRequest } from '../dtos'
import { User } from '../infra/typeorm/entities'

export interface UsersRepositoryInterface {
  create(data: UserCreationRequest): Promise<void>
  save(user: User): Promise<void>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
  findByUsername(username: string): Promise<User | undefined>
}
