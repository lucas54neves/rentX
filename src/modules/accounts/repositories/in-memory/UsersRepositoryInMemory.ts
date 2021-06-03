import { UserCreationRequest } from '@modules/accounts/dtos'
import { User } from '@modules/accounts/infra/typeorm/entities'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[]

  constructor() {
    this.users = []
  }

  async create(data: UserCreationRequest): Promise<User> {
    return new User(
      data.name,
      data.username,
      data.email,
      data.password,
      data.driverLicense,
      'avatarFile'
    )
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id)
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }
}

export { UsersRepositoryInMemory }
