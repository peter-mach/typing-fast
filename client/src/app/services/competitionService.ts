import { action } from 'mobx'
import { Socket, io } from 'socket.io-client'

import { usePlayerStore } from '../stores/playerStore'
import { useRoundStore } from '../stores/roundStore'
import { ESocketEventsEmit, ESocketEventsOn, IRoundUpdate } from '../types'
import LocalStorageService from './localStorageService'

class CompetitionService {
  private roundStore = useRoundStore()
  private playerStore = usePlayerStore()

  private socket: Socket | null = null

  initialize() {
    this.initializeSocket()
    this.loadPlayerFromLocalStorage()
  }

  destroy() {
    this.destroySocket()
  }

  initializeSocket() {
    this.socket = io('http://localhost:3003')

    this.socket.on(ESocketEventsOn.ROUND_UPDATE, this.handleRoundUpdate)
    this.socket.on(ESocketEventsOn.ROUND_END, this.handleRoundEnd)
    this.socket.on(ESocketEventsOn.PLAYER_STATS, this.handlePlayerStats)
  }

  destroySocket() {
    if (this.socket) {
      this.socket.off(ESocketEventsOn.ROUND_UPDATE, this.handleRoundUpdate)
      this.socket.off(ESocketEventsOn.ROUND_END, this.handleRoundEnd)
      this.socket.off(ESocketEventsOn.PLAYER_STATS, this.handlePlayerStats)
      this.socket.disconnect()
      this.socket = null
    }
  }

  loadPlayerFromLocalStorage() {
    const playerId = LocalStorageService.getItem('playerId') || ''
    const playerName = LocalStorageService.getItem('playerName') || ''
    this.playerStore.setPlayerId(playerId)
    this.playerStore.setPlayerName(playerName)
    // notify server
    if (this.socket && playerId && playerName) {
      this.socket.emit(ESocketEventsEmit.PLAYER_JOINED, playerId, playerName)
    }
  }

  handleKeyPress(key: string) {
    if (this.roundStore.sentence.startsWith(this.roundStore.progress + key)) {
      this.roundStore.setProgress(this.roundStore.progress + key)
      this.updatePlayerStats()
      this.roundStore.setCorrect(true)
      setTimeout(() => {
        this.roundStore.setCorrect(false)
      }, 200)
    } else {
      this.roundStore.setError(true)
      setTimeout(() => {
        this.roundStore.setError(false)
      }, 200)
    }
  }

  updatePlayerStats() {
    const { progress, sentence } = this.roundStore
    const correctChars = progress.length
    const totalChars = sentence.length
    const accuracy = correctChars / totalChars

    const startTime = this.roundStore.roundStartTime
    const endTime = Date.now()
    const timeDiff = (endTime - startTime) / 60000
    const wordsTyped = progress.trim().split(' ').filter(Boolean).length
    const wpm = timeDiff > 0 ? Math.round(wordsTyped / timeDiff) : 0

    this.roundStore.setWpm(wpm)
    this.roundStore.setAccuracy(accuracy)

    if (this.socket) {
      this.socket.emit(ESocketEventsEmit.PLAYER_STATS, this.playerStore.playerId, progress, wpm, accuracy)
    }
  }

  handleRoundUpdate = action((roundUpdate: IRoundUpdate) => {
    console.log('ROUND_UPDATE received:', roundUpdate)
    this.roundStore.update(roundUpdate)
  })

  handleRoundEnd = action(() => {
    console.log('ROUND_END received:')

    this.roundStore.reset()
  })

  handlePlayerStats = action((playerId: string, progress: string, wpm: number, accuracy: number) => {
    console.log('Player Stats received:', { playerId, progress, wpm, accuracy })
    const playerIndex = this.roundStore.players.findIndex((player) => player.id === playerId)
    if (playerIndex !== -1) {
      this.roundStore.updatePlayerStats(playerIndex, progress, wpm, accuracy)
    }
  })

  handlePlayerNameSubmit = (playerName: string) => {
    const playerId = this.generatePlayerId(playerName)
    this.playerStore.setPlayerId(playerId)
    this.playerStore.setPlayerName(playerName)
    // persist
    LocalStorageService.setItem('playerId', playerId)
    LocalStorageService.setItem('playerName', playerName)
    // notify server
    if (this.socket) {
      this.socket.emit(ESocketEventsEmit.PLAYER_JOINED, playerId, playerName)
    }
  }

  private generatePlayerId(playerName: string) {
    const browserData = window.navigator.userAgent
    const timestamp = Date.now()
    const nameHash = btoa(playerName).substring(0, 15)
    const hash = btoa(`${browserData}-${timestamp}`).substring(0, 15)
    return nameHash + hash
  }
}

let service: CompetitionService

export function useCompetitionService() {
  if (!service) {
    service = new CompetitionService()
  }
  return service
}
