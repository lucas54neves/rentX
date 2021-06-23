import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import createConnection from '@shared/infra/typeorm'
import '@shared/container'
import swaggerFile from '../../../swagger.json'
import { routes } from '@shared/infra/http/routes'
import { AppError } from '@shared/errors'

createConnection()

const app = express()

app.disable('x-powered-by')

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'app-error',
        message: err.message
      })
    } else {
      return response.status(500).json({
        status: 'server-error',
        message: `Internal server error - ${err.message}`
      })
    }
  }
)

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
