import { UserCreationRequest } from '@modules/accounts/dtos'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories'
import { AppError } from '@shared/errors'
import { UserCreationUseCase } from './UserCreationUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory

let userCreationUseCase: UserCreationUseCase

let testUsers: UserCreationRequest[]

describe('Create user', () => {
  beforeAll(() => {
    testUsers = [
      {
        name: 'Test user 1',
        username: 'testuser1',
        email: 'testuser1@mail.com',
        password: '12345',
        driverLicense: 'ABC123'
      },
      {
        name: 'Test user 2',
        username: 'testuser2',
        email: 'testuser1@mail.com',
        password: '54321',
        driverLicense: 'BNG435'
      },
      {
        name: 'Test user 3',
        username: 'testuser1',
        email: 'testuser3@mail.com',
        password: '13579',
        driverLicense: 'QWE876'
      }
    ]
  })

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    userCreationUseCase = new UserCreationUseCase(usersRepositoryInMemory)
  })

  it('should be able to create a new user', async () => {
    await userCreationUseCase.execute({
      name: testUsers[0].name,
      username: testUsers[0].username,
      email: testUsers[0].email,
      password: testUsers[0].password,
      driverLicense: testUsers[0].driverLicense
    })

    const userCreated = await usersRepositoryInMemory.findByEmail(
      testUsers[0].email
    )

    expect(userCreated).toHaveProperty('id')
  })

  it('should not be able to create a new user with email in use', async () => {
    expect(async () => {
      await userCreationUseCase.execute({
        name: testUsers[0].name,
        username: testUsers[0].username,
        email: testUsers[0].email,
        password: testUsers[0].password,
        driverLicense: testUsers[0].driverLicense
      })

      await userCreationUseCase.execute({
        name: testUsers[1].name,
        username: testUsers[1].username,
        email: testUsers[1].email,
        password: testUsers[1].password,
        driverLicense: testUsers[1].driverLicense
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new user with username in use', async () => {
    expect(async () => {
      await userCreationUseCase.execute({
        name: testUsers[0].name,
        username: testUsers[0].username,
        email: testUsers[0].email,
        password: testUsers[0].password,
        driverLicense: testUsers[0].driverLicense
      })

      await userCreationUseCase.execute({
        name: testUsers[2].name,
        username: testUsers[2].username,
        email: testUsers[2].email,
        password: testUsers[2].password,
        driverLicense: testUsers[2].driverLicense
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
