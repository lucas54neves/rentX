import { Router } from 'express'

import { authenticationRoutes } from './authentication.routes'
import { categoriesRoutes } from './categories.routes'
import { carsRoutes } from './cars.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'
import { ensureAuthenticated } from '@shared/infra/http/middleware'
import { rentalsRoutes } from './rentals.routes'

const routes = Router()

routes.use('/categories', categoriesRoutes)
routes.use('/specifications', specificationsRoutes)
routes.use('/users', usersRoutes)
routes.use('/cars', carsRoutes)
routes.use('/rentals', rentalsRoutes)
routes.use(authenticationRoutes)

export { routes }
