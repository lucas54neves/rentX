import { getRepository, Repository } from 'typeorm'

import { CreateUserRequest } from '@modules/accounts/dtos'
import { User } from '@modules/accounts/infra/typeorm/entities'
import { UsersRepositoryInterface } from '@modules/accounts/repositories'

class UsersRepository implements UsersRepositoryInterface {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    name,
    username,
    email,
    password,
    driverLicense
  }: CreateUserRequest): Promise<User> {
    const user = this.repository.create({
      name,
      username,
      email,
      password,
      driverLicense
    })

    await this.save(user)

    return user
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email })
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id)
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.repository.findOne({ username })
  }
}

export { UsersRepository }
