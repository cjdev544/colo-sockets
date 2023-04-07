/* eslint-disable no-undef */
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const buttonNewTicket = document.querySelector('#buttonNewTicket')

const socket = io()

socket.on('connect', () => {
  buttonNewTicket.disabled = false
  socket.on(
    'actual-tickets',
    ({ lastTicket }) => (lblNuevoTicket.innerText = 'Ticket ' + lastTicket)
  )
})

socket.on('disconnect', () => {
  buttonNewTicket.disabled = true
})

buttonNewTicket.addEventListener('click', () => {
  socket.emit('create-ticket', null, (ticket) => {
    lblNuevoTicket.innerText = 'Ticket ' + ticket
  })
})
