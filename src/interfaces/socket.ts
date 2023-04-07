export interface ServerToClientEvents {
  'actual-tickets': (dataTickets: TicketModel) => void
}

export interface ClientToServerEvents {
  'create-ticket': (
    payload: null,
    callback: (numberTicket: number) => void
  ) => void

  'check-ticket': (
    desk: string,
    callback: ({
      ok,
      ticket,
      err
    }: {
      ok: boolean
      ticket: number | null
      err?: string
    }) => void
  ) => void
}
export interface TicketModel {
  lastTicket: number
  dateToday?: number
  tickets: Ticket[]
  last4Tickets: Ticket[]
}

export interface Ticket {
  ticketNumber: number
  desk: string | null
  err?: string
}
