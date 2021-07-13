import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'
import { CreateUserRequest } from '@modules/accounts/dtos'
import { UsersRepositoryInterface } from '@modules/accounts/repositories'
import { User } from '@modules/accounts/infra/typeorm/entities'

@injectable()
class CreateUserUseCase {
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
  }: CreateUserRequest): Promise<User> {
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

    return this.usersRepository.create({
      name,
      username,
      email,
      password: passwordHashed,
      driverLicense
    })
  }
}

export { CreateUserUseCase }
