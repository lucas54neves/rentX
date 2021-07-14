import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'
import {
  AuthenticateUserRequest,
  AuthenticateUserResponse
} from '@modules/accounts/dtos'
import {
  UsersRepositoryInterface,
  UsersTokensRepositoryInterface
} from '@modules/accounts/repositories'
import auth from '@config/auth'
import { DateProviderInterface } from '@shared/container/providers/DateProvider/DateProviderInterface'

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
    @inject('UsersTokensRepository')
    private usersTokensRepository: UsersTokensRepositoryInterface,
    @inject('DayjsDateProvider')
    private dateProvider: DateProviderInterface
  ) {}

  async execute({
    email,
    password
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    const { secretKey: secretKeyToken, expiresIn: expiresInToken } = auth.token

    const {
      secretKey: secretKeyRefreshToken,
      expiresIn: expiresInRefreshToken,
      expiresInDays: expiresDateRefreshToken
    } = auth.refreshToken

    if (!user) {
      throw new AppError('Email or password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }

    const token = sign({}, secretKeyToken, {
      subject: user.id,
      expiresIn: expiresInToken
    })

    const refreshToken = sign({ email }, secretKeyRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken
    })

    const refreshTokenExpiresIn = this.dateProvider.addDays(
      expiresDateRefreshToken
    )

    await this.usersTokensRepository.create({
      userId: user.id,
      expiresDate: refreshTokenExpiresIn,
      refreshToken
    })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refreshToken
    }
  }
}

export { AuthenticateUserUseCase }
