import { Router } from 'express'

import { authenticationRoutes } from './authentication.routes'
import { categoriesRoutes } from './categories.routes'
import { carsRoutes } from './cars.routes'
import { ensureAuthenticated } from '@shared/infra/http/middlewares'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.use('/categories', ensureAuthenticated, categoriesRoutes)
routes.use('/specifications', ensureAuthenticated, specificationsRoutes)
routes.use('/users', usersRoutes)
routes.use(authenticationRoutes)
routes.use('/cars', carsRoutes)

export { routes }
