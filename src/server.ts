import express from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerFile from './swagger.json'
import './database'
import { routes } from './routes'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
