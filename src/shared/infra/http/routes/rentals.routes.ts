import { Router } from 'express'

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { ensureAuthenticated } from '../middleware'
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()

const devolutionRentalController = new DevolutionRentalController()

rentalsRoutes.use(ensureAuthenticated)

rentalsRoutes.post('/', createRentalController.handle)

rentalsRoutes.get('/devolution/:id', devolutionRentalController.handle)

export { rentalsRoutes }
