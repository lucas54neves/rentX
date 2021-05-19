import { Router } from 'express'

import { UserCreationController } from '../modules/accounts/useCases/userCreation/UserCreationController'

const usersRoutes = Router()

const userCreationController = new UserCreationController()

usersRoutes.post('/', userCreationController.handle)

export { usersRoutes }
