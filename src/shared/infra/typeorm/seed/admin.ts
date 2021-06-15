import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection('localhost')

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

  await connection.close()
}

create().then(() => console.log('User admin created'))
