import express, { Application } from 'express'
import { errors } from 'celebrate'
import helmet from 'helmet'

// load environment variables before initializing other things
import './setup/processEnvironmentSetup'
import router from './routes'

const server: Application = express()

server
  // inject express included body-parser to handle requests with json body
  .use(express.json())

  // inject helmet to add headers that help to keep the application secure
  .use(helmet())

  // inject router to handle the request routes
  .use('/', router)

  // inject celebrate error handler middleware
  .use(errors())

server.listen(process.env.API_PORT || 8081, () => {
  logger.info(`API-Server is listening on port ${process.env.API_PORT || 8081}`)
})

export default server
