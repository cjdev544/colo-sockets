import express, { Application } from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { socketsControllers } from './sockets/controllers'
import { ClientToServerEvents, ServerToClientEvents } from './interfaces/socket'
dotenv.config()

export const upServer = () => {
  const app: Application = express()

  const PORT = process.env.PORT || 3000

  // Middleware functions
  app.use(cors())
  app.use(morgan('dev'))
  app.use(express.static(path.join(__dirname, '../public')))

  // Create socket server
  const server = createServer(app)
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server)

  // Listen for connections
  //io.on('connect', socketsControllers)
  io.on('connect', socketsControllers)
  // Run server
  server.listen(PORT, () => console.log(`✔ Server started on port: ${PORT}`))
}
