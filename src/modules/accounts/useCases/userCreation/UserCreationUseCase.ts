import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors'

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

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: passwordHashed,
      driverLicense
    })

    await this.usersRepository.save(user)
  }
}

export { UserCreationUseCase }
