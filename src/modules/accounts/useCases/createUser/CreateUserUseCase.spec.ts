import { CreateUserRequest } from '@modules/accounts/dtos'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories'
import { AppError } from '@shared/errors'
import { CreateUserUseCase } from './CreateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory

let createUserUseCase: CreateUserUseCase

let testUsers: CreateUserRequest[]

describe('Create user', () => {
  beforeAll(() => {
    testUsers = [
      {
        name: 'Test user 1',
        username: 'testuser1',
        email: 'testuser1@mail.com',
        password: 'PbFltWmBaJ2apg5OqXyT0J+hHSRQjSeVlp5xvGkpR3Q=',
        driverLicense: 'ABC123'
      },
      {
        name: 'Test user 2',
        username: 'testuser2',
        email: 'testuser1@mail.com',
        password: 'IuahiL/MmSsttdfQgxeppnORecf61gpsvBroL21M7iM=',
        driverLicense: 'BNG435'
      },
      {
        name: 'Test user 3',
        username: 'testuser1',
        email: 'testuser3@mail.com',
        password: 'SOaNnbajr7zpK3UM6AcHKZR+9Ig2Mjx/GopCw8lZ9e4=',
        driverLicense: 'QWE876'
      }
    ]
  })

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to create a new user', async () => {
    await createUserUseCase.execute({
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
    await expect(async () => {
      await createUserUseCase.execute({
        name: testUsers[0].name,
        username: testUsers[0].username,
        email: testUsers[0].email,
        password: testUsers[0].password,
        driverLicense: testUsers[0].driverLicense
      })

      await createUserUseCase.execute({
        name: testUsers[1].name,
        username: testUsers[1].username,
        email: testUsers[1].email,
        password: testUsers[1].password,
        driverLicense: testUsers[1].driverLicense
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new user with username in use', async () => {
    await expect(async () => {
      await createUserUseCase.execute({
        name: testUsers[0].name,
        username: testUsers[0].username,
        email: testUsers[0].email,
        password: testUsers[0].password,
        driverLicense: testUsers[0].driverLicense
      })

      await createUserUseCase.execute({
        name: testUsers[2].name,
        username: testUsers[2].username,
        email: testUsers[2].email,
        password: testUsers[2].password,
        driverLicense: testUsers[2].driverLicense
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
