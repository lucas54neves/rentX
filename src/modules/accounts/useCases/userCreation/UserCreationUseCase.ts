import { inject, injectable } from 'tsyringe'

import { UserCreationRequest } from '../../dtos'
import { IUsersRepository } from '../../repositories'

@injectable()
class UserCreationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driverLicense
  }: UserCreationRequest) {
    await this.usersRepository.create({
      name,
      username,
      email,
      password,
      driverLicense
    })
  }
}

export { UserCreationUseCase }
