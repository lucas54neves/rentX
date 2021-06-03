import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares'
import { authenticationRoutes } from './authentication.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.use('/categories', ensureAuthenticated, categoriesRoutes)
routes.use('/specifications', ensureAuthenticated, specificationsRoutes)
routes.use('/users', usersRoutes)
routes.use(authenticationRoutes)

export { routes }
