import { AppError } from '@shared/errors'
import { UserCreationRequest } from '@modules/accounts/dtos'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UserCreationUseCase } from '../userCreation/UserCreationUseCase'
import { UserAuthenticationUseCase } from './UserAuthenticationUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let userAuthenticationUserCase: UserAuthenticationUseCase
let userCreationUseCase: UserCreationUseCase
let user: UserCreationRequest

describe('User authentication', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    userAuthenticationUserCase = new UserAuthenticationUseCase(
      usersRepositoryInMemory
    )

    userCreationUseCase = new UserCreationUseCase(usersRepositoryInMemory)

    user = {
      name: 'User Test',
      email: 'test@main.com',
      username: 'usertest',
      password: '123456',
      driverLicense: '0001234'
    }
  })

  it('should be able to authenticate an user', async () => {
    await userCreationUseCase.execute(user)

    const result = await userAuthenticationUserCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty('token')
  })

  it('shout not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await userAuthenticationUserCase.execute({
        email: 'false@mail.com',
        password: 'false123'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('shout not be able to authenticate with incorrect password', () => {
    expect(async () => {
      await userCreationUseCase.execute(user)

      await userAuthenticationUserCase.execute({
        email: user.email,
        password: 'false123'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
