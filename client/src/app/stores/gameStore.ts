import { makeAutoObservable } from 'mobx'

class GameStore {
  currentSentence: string = 'loading...'
  typedText: string = ''
  error: boolean = false
  roundTime: number = 0
  progressBgKey: number = 1
  wpm: number = 0
  accuracy: number = 1

  constructor() {
    makeAutoObservable(this)
  }

  setCurrentSentence(sentence: string) {
    this.currentSentence = sentence
  }

  setTypedText(text: string) {
    this.typedText = text
  }

  setError(error: boolean) {
    this.error = error
  }

  setRoundTime(time: number) {
    this.roundTime = time
  }

  setProgressBgKey(key: number) {
    this.progressBgKey = key
  }

  setWpm(wpm: number) {
    this.wpm = wpm
  }

  setAccuracy(accuracy: number) {
    console.log('THIS:', this)

    this.accuracy = accuracy
  }
}

let store: GameStore

export function useGameStore() {
  if (!store) {
    store = new GameStore()
  }
  return store
}
