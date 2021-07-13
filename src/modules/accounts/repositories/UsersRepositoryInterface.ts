import { CreateUserRequest } from '../dtos'
import { User } from '../infra/typeorm/entities'

export interface UsersRepositoryInterface {
  create(data: CreateUserRequest): Promise<User>
  save(user: User): Promise<void>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
  findByUsername(username: string): Promise<User | undefined>
}
