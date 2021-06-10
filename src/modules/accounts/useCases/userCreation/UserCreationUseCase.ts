import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'
import { UserCreationRequest } from '@modules/accounts/dtos'
import { UsersRepositoryInterface } from '@modules/accounts/repositories'

@injectable()
class UserCreationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driverLicense
  }: UserCreationRequest) {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email)

    if (emailAlreadyInUse) {
      throw new AppError('Email already in use')
    }

    const usernameAlreadyInUse = await this.usersRepository.findByUsername(
      username
    )

    if (usernameAlreadyInUse) {
      throw new AppError('Username already in use')
    }

    const passwordHashed = await hash(password, 8)

    await this.usersRepository.create({
      name,
      username,
      email,
      password: passwordHashed,
      driverLicense
    })
  }
}

export { UserCreationUseCase }
