// ./app/stores/roundStore.ts
import { action, makeAutoObservable } from 'mobx'

import { IPlayerStats, IRoundUpdate } from '../types'

export class RoundStore {
  id: string = ''
  sentence: string = ''

  roundEndTime: number = 0
  roundStartTime: number = 0
  roundTime: number = 0

  players: IPlayerStats[] = []

  progress: string = ''
  wpm: number = 0
  accuracy: number = 100

  error: boolean = false
  correct: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setId(id: string) {
    this.id = id
  }

  setSentence(sentence: string) {
    this.sentence = sentence
  }

  setRoundEndTime(roundEndTime: number) {
    this.roundEndTime = roundEndTime
  }

  setRoundStartTime(roundStartTime: number) {
    this.roundStartTime = roundStartTime
  }

  setRoundTime(roundTime: number) {
    this.roundTime = roundTime
  }

  setPlayers(players: IPlayerStats[]) {
    this.players = players
  }

  setProgress(progress: string) {
    this.progress = progress
  }

  setWpm(wpm: number) {
    this.wpm = wpm
  }

  setAccuracy(accuracy: number) {
    this.accuracy = accuracy
  }

  setError(error: boolean) {
    this.error = error
  }

  setCorrect(correct: boolean) {
    this.correct = correct
  }

  updatePlayerStats(playerIndex: number, progress: string, wpm: number, accuracy: number) {
    this.players[playerIndex].progress = progress
    this.players[playerIndex].wpm = wpm
    this.players[playerIndex].accuracy = accuracy
  }

  reset() {
    this.id = ''
    this.sentence = ''
    this.roundEndTime = 0
    this.roundStartTime = 0
    this.roundTime = 0
    this.players = []
    this.progress = ''
    this.wpm = 0
    this.accuracy = 100
  }

  update(roundUpdate: IRoundUpdate) {
    this.id = roundUpdate.id
    this.sentence = roundUpdate.sentence
    this.roundEndTime = roundUpdate.roundEndTime
    this.roundStartTime = roundUpdate.roundStartTime
    this.roundTime = roundUpdate.roundTime
    this.players = roundUpdate.players
  }
}

let store: RoundStore | null = null

export function useRoundStore() {
  if (store === null) {
    store = new RoundStore()
  }
  return store
}
