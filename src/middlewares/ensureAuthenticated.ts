import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UsersRepository } from '../modules/accounts/repositories'

type PayloadType = {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('Token missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(
      token,
      '997db1d173c7d429f21aa54fe4faaad6'
    ) as PayloadType

    const usersRepository = new UsersRepository()

    const user = usersRepository.findById(userId)

    if (!user) {
      throw new Error('User does not exists')
    }

    next()
  } catch {
    throw new Error('Invalid token')
  }
}
