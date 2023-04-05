export interface ServerToClientEvents {
  'server-emit': (payload: SocketData) => void
}

export interface ClientToServerEvents {
  'client-emit': (payload: SocketData, callback: (e: number) => void) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  id: string
  date: number
  msg: string
}
