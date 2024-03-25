import http from 'http'
import { Server, Socket } from 'socket.io'

import { CompetitionController } from './controllers/competitionController'
import { ESocketEventsOn } from './types/types'

export class ServerSocket {
  private io: Server
  private competitionController: CompetitionController
  private connectedClients: number = 0

  constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    })

    this.competitionController = new CompetitionController()

    this.io.on('connection', (socket: Socket) => {
      console.log(`👤 New client connected`)
      this.connectedClients++

      if (this.connectedClients === 1) {
        this.startNextRound(socket)
      }

      socket.on(ESocketEventsOn.PLAYER_JOINED, (id: string, name: string) => {
        this.competitionController.handlePlayerJoined(socket, id, name)
      })

      socket.on(ESocketEventsOn.PLAYER_STATS, (playerId: string, progress: string, wpm: number, accuracy: number) => {
        this.competitionController.handlePlayerStats(socket, playerId, progress, wpm, accuracy)
      })

      socket.on('disconnect', () => {
        console.log(`👤 client disconnected`)
        this.connectedClients--

        if (this.connectedClients === 0) {
          this.competitionController.endCompetition(socket)
        }
      })
    })
  }

  startNextRound(socket: Socket): void {
    this.competitionController.startCompetition(socket, () => {
      if (this.connectedClients > 0) {
        this.startNextRound(socket)
      }
    })
  }
}
