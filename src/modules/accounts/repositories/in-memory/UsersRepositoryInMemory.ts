import { CreateUserRequest } from '@modules/accounts/dtos'
import { User } from '@modules/accounts/infra/typeorm/entities'
import { UsersRepositoryInterface } from '../UsersRepositoryInterface'

class UsersRepositoryInMemory implements UsersRepositoryInterface {
  private users: User[]

  constructor() {
    this.users = []
  }

  async create(data: CreateUserRequest): Promise<void> {
    const user = new User(
      data.name,
      data.username,
      data.email,
      data.password,
      data.driverLicense,
      'avatarFile'
    )

    await this.save(user)
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
