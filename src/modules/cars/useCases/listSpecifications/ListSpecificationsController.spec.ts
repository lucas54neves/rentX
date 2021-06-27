import request from 'supertest'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { Connection } from 'typeorm'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'

let connection: Connection

describe('List Specification Controller', () => {
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

  it('should be able to list all specifications', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentx.com.br', password: 'admin' })

    const { token } = responseToken.body

    await request(app)
      .post('/specifications')
      .send({
        name: 'Specification Test1',
        description: 'Specification description test'
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app)
      .get('/specifications')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('Specification Test1')
  })
})
