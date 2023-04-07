/* eslint-disable no-undef */
// HTML ref
const checkingTicket = document.querySelector('small')
const alert = document.querySelector('.alert')
const h4text = document.querySelector('#h4text')
const lblPendientes = document.querySelector('#lblPendientes')
const btnCheckTicket = document.querySelector('button')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('El escritorio es obligatorio')
}

const desk = searchParams.get('escritorio')

document.querySelector('h1').innerText = 'Escritorio ' + desk
alert.style.display = 'none'

const socket = io()

socket.on('actual-tickets', ({ tickets, last4Tickets }) => {
  lblPendientes.innerText = tickets.length
  const ticket = last4Tickets.find((t) => t.desk === desk)
  if (ticket) {
    checkingTicket.innerText = 'Ticket' + ticket.ticketNumber
  } else {
    checkingTicket.innerText = 'Nadie'
  }
})

btnCheckTicket.addEventListener('click', () => {
  socket.emit('check-ticket', desk, ({ ok, ticket, err }) => {
    if (!ok) {
      if (err) throw new Error(err)

      alert.style.display = ''
      checkingTicket.innerText = 'Nadie'
    } else {
      alert.style.display = 'none'
      checkingTicket.innerText = 'Ticket ' + ticket
    }
  })
})
