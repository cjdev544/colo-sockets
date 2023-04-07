import { Socket } from 'socket.io'
import TicketControl from '../models/tickets'
import {
  ClientToServerEvents,
  ServerToClientEvents
} from '../interfaces/socket'

type SocketOptions = Socket<ClientToServerEvents, ServerToClientEvents>

const ticketControl = new TicketControl()

export const socketsControllers = (socket: SocketOptions) => {
  socket.emit('actual-tickets', ticketControl.toJson)

  socket.on('create-ticket', (_payload, callback) => {
    const ticket = ticketControl.nextTicket()
    callback(ticket)
    socket.broadcast.emit('actual-tickets', ticketControl.toJson)
  })

  socket.on('check-ticket', (payload, callback) => {
    if (!payload || isNaN(+payload)) {
      callback({
        ok: false,
        ticket: null,
        err: 'El número de escritorio es obligatorio'
      })
    }
    const ticket = ticketControl.checkTicket(payload)
    if (ticket) {
      callback({ ok: true, ticket: ticket.ticketNumber })
      socket.emit('actual-tickets', ticketControl.toJson)
      socket.broadcast.emit('actual-tickets', ticketControl.toJson)
    } else {
      callback({ ok: false, ticket: null })
    }
  })
}
