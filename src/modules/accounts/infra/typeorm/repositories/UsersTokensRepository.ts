import { CreateUserTokensRequest } from '@modules/accounts/dtos'
import { UsersTokensRepositoryInterface } from '@modules/accounts/repositories/UsersTokensRepositoryInterface'
import { getRepository, Repository } from 'typeorm'
import { UserTokens } from '../entities'

class UsersTokensRepository implements UsersTokensRepositoryInterface {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
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

export { UsersTokensRepository }
