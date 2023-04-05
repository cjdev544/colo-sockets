import { Socket } from 'socket.io'
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from '../interfaces/socket'

type SocketOptions = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>

export const socketsControllers = (socket: SocketOptions) => {
  socket.on('disconnect', () => console.log('client disconnected'))

  socket.on('client-emit', (payload: SocketData, callback) => {
    callback(123)
    socket.broadcast.emit('server-emit', payload)
  })
}
