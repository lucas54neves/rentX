import { UserCreationRequest } from '../dtos'

interface IUsersRepository {
  create(data: UserCreationRequest): Promise<void>
}

export { IUsersRepository }
