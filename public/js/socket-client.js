/* eslint-disable no-undef */
// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

const socket = io()

socket.on('connect', () => {
  // console.log('Conectado');

  lblOffline.style.display = 'none'
  lblOnline.style.display = ''
})

socket.on('disconnect', () => {
  // console.log('Desconectado del servidor');

  lblOnline.style.display = 'none'
  lblOffline.style.display = ''
})

socket.on('server-emit', (payload) => {
  console.log(payload)
})

btnEnviar.addEventListener('click', () => {
  const msg = txtMensaje.value
  const payload = {
    msg,
    id: '123ABC',
    date: new Date().getTime()
  }

  socket.emit('client-emit', payload, (id) => {
    console.log('FromServer', id)
  })
})
