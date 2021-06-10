import { AppError } from '@shared/errors'
import { UserCreationRequest } from '@modules/accounts/dtos'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UserCreationUseCase } from '../userCreation/UserCreationUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory

let authenticateUserUserCase: AuthenticateUserUseCase

let userCreationUseCase: UserCreationUseCase

let user: UserCreationRequest

describe('User authentication', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    authenticateUserUserCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    )

    userCreationUseCase = new UserCreationUseCase(usersRepositoryInMemory)

    user = {
      name: 'User Test',
      email: 'test@main.com',
      username: 'usertest',
      password: 'OHjcWdaFE35A7kBJBmVyjlNfaJ8lWgHI2zaUR4tjGhI=',
      driverLicense: '0001234'
    }
  })

  it('should be able to authenticate an user', async () => {
    await userCreationUseCase.execute(user)

    const result = await authenticateUserUserCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty('token')
  })

  it('shout not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUserCase.execute({
        email: 'false@mail.com',
        password: '55Y8Tc+IMN+yJb+Z/UHZz3iJKXNLSdbWv8grYxDEtpo='
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('shout not be able to authenticate with incorrect email', () => {
    expect(async () => {
      await userCreationUseCase.execute(user)

      await authenticateUserUserCase.execute({
        email: 'false@mail.com',
        password: user.password
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('shout not be able to authenticate with incorrect password', () => {
    expect(async () => {
      await userCreationUseCase.execute(user)

      await authenticateUserUserCase.execute({
        email: user.email,
        password: '55Y8Tc+IMN+yJb+Z/UHZz3iJKXNLSdbWv8grYxDEtpo='
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
