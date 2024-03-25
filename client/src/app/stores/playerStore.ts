import { action, makeAutoObservable } from 'mobx'

export class PlayerStore {
  initialized = false
  playerId: string = ''
  playerName: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  setPlayerId(id: string) {
    this.playerId = id
  }

  setPlayerName(name: string) {
    this.playerName = name
  }
}

let store: PlayerStore | null = null

export function usePlayerStore() {
  if (store === null) {
    store = new PlayerStore()
  }
  return store
}
