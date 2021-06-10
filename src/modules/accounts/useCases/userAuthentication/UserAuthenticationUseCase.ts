import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'
import {
  UserAuthenticationRequest,
  UserAuthenticationResponse
} from '@modules/accounts/dtos'
import { UsersRepositoryInterface } from '@modules/accounts/repositories'

@injectable()
class UserAuthenticationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface
  ) {}

  async execute({
    email,
    password
  }: UserAuthenticationRequest): Promise<UserAuthenticationResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }

    const token = sign({}, '997db1d173c7d429f21aa54fe4faaad6', {
      subject: user.id,
      expiresIn: '1d'
    })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }
}

export { UserAuthenticationUseCase }
