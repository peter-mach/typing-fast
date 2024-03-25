import { Socket } from 'socket.io'

import { CompetitionService } from '../services/competitionService'
import { ESocketEventsEmit } from '../types/types'

function resetTimeout(timeout: NodeJS.Timeout | null) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
}
export class CompetitionController {
  private competitionService: CompetitionService
  private competitionTimeout: NodeJS.Timeout | null = null

  constructor() {
    this.competitionService = new CompetitionService()
    console.log('🚀 CompetitionController initialized, wating for players ⏱')
  }

  handlePlayerJoined(socket: Socket, id: string, name: string): void {
    console.log(`👤 Player joined: ${id} ${name}`)
    this.competitionService.addPlayer(id, name)
    socket.emit(ESocketEventsEmit.ROUND_UPDATE, this.competitionService.getActiveRound())
    socket.broadcast.emit(ESocketEventsEmit.ROUND_UPDATE, this.competitionService.getActiveRound())
    console.log(`📤 PLAYER_JOINED event emitted for ${name}`)
  }

  handlePlayerStats(socket: Socket, playerId: string, progress: string, wpm: number, accuracy: number): void {
    console.log(`📊 Stats updated for player ${playerId} - Progress: ${progress}, WPM: ${wpm}, Accuracy: ${accuracy}`)
    this.competitionService.updatePlayerStats(playerId, progress, wpm, accuracy)
    socket.emit(ESocketEventsEmit.PLAYER_STATS, playerId, progress, wpm, accuracy)
    socket.broadcast.emit(ESocketEventsEmit.PLAYER_STATS, playerId, progress, wpm, accuracy)
    console.log(`📡 PLAYER_STATS broadcasted for ${playerId}.`)
  }

  getNextSentence(): string {
    return this.competitionService.getNextSentence()
  }

  startCompetition(socket: Socket, onRoundEnd: () => void): void {
    this.competitionService.startCompetitionRound()
    const activeRound = this.competitionService.getActiveRound()!
    console.log(`🏁 Competition started with sentence: ${activeRound.sentence}`)
    console.log(`⏱ Round time: ${activeRound.roundTime}`)
    socket.emit(ESocketEventsEmit.ROUND_UPDATE, this.competitionService.getActiveRound())
    socket.broadcast.emit(ESocketEventsEmit.ROUND_UPDATE, this.competitionService.getActiveRound())
    console.log(`📣 COMPETITION_UPDATE emitted and broadcasted for start.`)

    resetTimeout(this.competitionTimeout)
    this.competitionTimeout = setTimeout(() => {
      console.log(`⏰ Competition time ended. Ending competition.`)
      socket.emit(ESocketEventsEmit.ROUND_END)
      socket.broadcast.emit(ESocketEventsEmit.ROUND_END)
      console.log(`🏆 COMPETITION_END emitted and broadcasted.`)
      onRoundEnd()
    }, activeRound.roundTime)
  }

  endCompetition(socket: Socket): void {
    console.log(`🏁 Competition ended due to all players disconnecting.`)
    this.competitionService.endCompetition()
    resetTimeout(this.competitionTimeout)
    socket.emit(ESocketEventsEmit.ROUND_END)
    socket.broadcast.emit(ESocketEventsEmit.ROUND_END)
    console.log(`🏆 COMPETITION_END emitted and broadcasted.`)
  }
}
