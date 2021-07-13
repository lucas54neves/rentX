import { AppError } from '@shared/errors'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { User } from '@modules/accounts/infra/typeorm/entities'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory

let authenticateUserUserCase: AuthenticateUserUseCase

let createUserUseCase: CreateUserUseCase

let user: User

describe('User authentication', () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    authenticateUserUserCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    )

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)

    user = await createUserUseCase.execute({
      name: 'User Test',
      email: 'test@main.com',
      username: 'usertest',
      password: 'blublublu12345',
      driverLicense: '0001234'
    })
  })

  it('should be able to authenticate an user', async () => {
    const result = await authenticateUserUserCase.execute({
      email: 'test@main.com',
      password: 'blublublu12345'
    })

    expect(result).toHaveProperty('token')
    expect(result.user).not.toBeNull()
    expect(result.user.name).toBe('User Test')
    expect(result.user.email).toBe('test@main.com')
  })

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUserCase.execute({
        email: 'false@mail.com',
        password: 'blbiblbi12344'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'))
  })

  it('should not be able to authenticate with incorrect email', async () => {
    await expect(
      authenticateUserUserCase.execute({
        email: 'false@mail.com',
        password: 'blublublu12345'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'))
  })

  it('should not be able to authenticate with incorrect password', () => {
    expect(
      authenticateUserUserCase.execute({
        email: 'test@main.com',
        password: 'blablabla12346'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'))
  })
})
