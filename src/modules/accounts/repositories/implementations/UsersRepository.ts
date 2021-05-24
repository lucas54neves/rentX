import { getRepository, Repository } from 'typeorm'
import { UserCreationRequest } from '../../dtos'
import { User } from '../../entities'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
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
  }: UserCreationRequest): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      password,
      driverLicense
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email })
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.repository.findOne({ username })
  }
}

export { UsersRepository }
