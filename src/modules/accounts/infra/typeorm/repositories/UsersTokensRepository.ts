import { CreateUserTokensRequest } from '@modules/accounts/dtos'
import { UsersTokensRepositoryInterface } from '@modules/accounts/repositories/UsersTokensRepositoryInterface'
import { Repository } from 'typeorm'
import { User, UserTokens } from '../entities'

class UsersTokensRepository implements UsersTokensRepositoryInterface {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = new Repository()
  }

  async create({
    userId,
    expiresDate,
    refreshToken
  }: CreateUserTokensRequest): Promise<UserTokens> {
    const userToken = this.repository.create({
      expiresDate,
      userId,
      refreshToken
    })

    this.save(userToken)

    return userToken
  }

  async save(userToken: UserTokens) {
    this.repository.save(userToken)
  }
}
