import fs from 'fs'
import path from 'path'
import { Ticket, TicketModel } from '../interfaces/socket'
import dataDb from '../db/data.json'

class TicketControl {
  constructor(
    public lastTicket: number = 0,
    public dateToday: number = new Date().getDay(),
    public tickets: Ticket[] = [],
    public last4Tickets: Ticket[] = []
  ) {
    this.init()
  }

  get toJson(): TicketModel {
    return {
      lastTicket: this.lastTicket,
      dateToday: this.dateToday,
      tickets: this.tickets,
      last4Tickets: this.last4Tickets
    }
  }

  nextTicket() {
    this.lastTicket += 1
    const newTicket: Ticket = {
      ticketNumber: this.lastTicket,
      desk: null
    }
    this.tickets.push(newTicket)
    this.saveDb()
    return newTicket.ticketNumber
  }

  checkTicket(desk: string) {
    if (this.tickets.length === 0) return null
    const ticket = this.tickets.shift()
    if (ticket) {
      ticket.desk = desk
      this.last4Tickets.unshift(ticket)

      if (this.last4Tickets.length > 4) this.last4Tickets.pop()
      this.saveDb()
      return ticket
    }
    return null
  }

  init() {
    const { dateToday, last4Tickets, lastTicket, tickets } = dataDb

    if (dateToday === this.dateToday) {
      this.lastTicket = lastTicket
      this.tickets = tickets
      this.last4Tickets = last4Tickets
    } else {
      this.saveDb()
    }
  }

  saveDb() {
    const dbPath = path.join(__dirname, '../db/data.json')
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
  }
}

export default TicketControl
