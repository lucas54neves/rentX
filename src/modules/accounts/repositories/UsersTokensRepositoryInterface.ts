import { CreateUserTokensRequest } from '../dtos'
import { UserTokens } from '../infra/typeorm/entities'

interface UsersTokensRepositoryInterface {
  create(data: CreateUserTokensRequest): Promise<UserTokens>
}

export { UsersTokensRepositoryInterface }
