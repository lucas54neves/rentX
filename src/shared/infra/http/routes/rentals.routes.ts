import { Router } from 'express'

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { ensureAuthenticated } from '../middleware'
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()

const devolutionRentalController = new DevolutionRentalController()

const listRentalsByUserController = new ListRentalsByUserController()

rentalsRoutes.use(ensureAuthenticated)

rentalsRoutes.post('/', createRentalController.handle)

rentalsRoutes.get('/devolution/:id', devolutionRentalController.handle)

rentalsRoutes.get('/user', listRentalsByUserController.handle)

export { rentalsRoutes }
