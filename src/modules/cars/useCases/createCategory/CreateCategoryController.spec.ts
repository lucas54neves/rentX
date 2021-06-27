import request from 'supertest'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { Connection } from 'typeorm'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'

let connection: Connection

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations()

    const id = uuidV4()

    const password = await hash('admin', 8)

    await connection.query(
      `INSERT INTO users(id, name, username, email, password, "isAdmin", "createdAt", "driverLicense")
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        'admin',
        'admin',
        'admin@rentx.com.br',
        password,
        true,
        'now()',
        'XXX-3443'
      ]
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()

    await connection.close()
  })

  it('should be able to create a new category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentx.com.br', password: 'admin' })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Test',
        description: 'Category description test 1'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new category with name exists', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentx.com.br', password: 'admin' })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Test',
        description: 'Category description test 1'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(400)
  })
})
