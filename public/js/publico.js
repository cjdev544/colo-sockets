/* eslint-disable no-undef */
console.log('Público HTML')
// HTML ref
const lblTicket1 = document.querySelector('#lblTicket1')
const lblTicket2 = document.querySelector('#lblTicket2')
const lblTicket3 = document.querySelector('#lblTicket3')
const lblTicket4 = document.querySelector('#lblTicket4')

const lblEscritorio1 = document.querySelector('#lblEscritorio1')
const lblEscritorio2 = document.querySelector('#lblEscritorio2')
const lblEscritorio3 = document.querySelector('#lblEscritorio3')
const lblEscritorio4 = document.querySelector('#lblEscritorio4')

const socket = io()
const soundAlert = new Audio('../audio/new-ticket.mp3')

socket.on('actual-tickets', ({ last4Tickets }) => {
  if (last4Tickets[0]) {
    lblTicket1.innerText = 'Ticket ' + last4Tickets[0].ticketNumber
    lblEscritorio1.innerText = 'Escritorio ' + last4Tickets[0].desk
    soundAlert.play()
  } else {
    lblTicket1.innerText = 'En espera'
    lblEscritorio1.innerText = 'En espera'
  }

  if (last4Tickets[1]) {
    lblTicket2.innerText = 'Ticket ' + last4Tickets[0].ticketNumber
    lblEscritorio2.innerText = 'Escritorio ' + last4Tickets[0].desk
  } else {
    lblTicket2.innerText = 'En espera'
    lblEscritorio2.innerText = 'En espera'
  }

  if (last4Tickets[2]) {
    lblTicket3.innerText = 'Ticket ' + last4Tickets[0].ticketNumber
    lblEscritorio3.innerText = 'Escritorio ' + last4Tickets[0].desk
  } else {
    lblTicket3.innerText = 'En espera'
    lblEscritorio3.innerText = 'En espera'
  }

  if (last4Tickets[3]) {
    lblTicket4.innerText = 'Ticket ' + last4Tickets[0].ticketNumber
    lblEscritorio4.innerText = 'Escritorio ' + last4Tickets[0].desk
  } else {
    lblTicket4.innerText = 'En espera'
    lblEscritorio4.innerText = 'En espera'
  }
})
