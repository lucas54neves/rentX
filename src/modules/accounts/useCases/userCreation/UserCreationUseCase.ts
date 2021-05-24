import { hash } from 'bcrypt'
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
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email)

    if (emailAlreadyInUse) {
      throw new Error('Email already in use')
    }

    const usernameAlreadyInUse = await this.usersRepository.findByUsername(
      username
    )

    if (usernameAlreadyInUse) {
      throw new Error('Username already in use')
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
