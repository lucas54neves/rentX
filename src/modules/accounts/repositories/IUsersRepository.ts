import { UserCreationRequest } from '../dtos'
import { User } from '../entities'

interface IUsersRepository {
  create(data: UserCreationRequest): Promise<User>
  save(user: User): Promise<void>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
  findByUsername(username: string): Promise<User | undefined>
}

export { IUsersRepository }
