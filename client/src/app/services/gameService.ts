// src/app/services/gameService.ts
import { GameState } from '../types/gameTypes'

export class GameService {
  private gameState: GameState = {
    sentences: [
      'The quick brown fox jumps over the lazy dog.',
      'All their equipment and instruments are alive.',
      'A watched pot never boils.',
      'Humpty Dumpty sat on a wall.',
      'Jack and Jill went up the hill.',
    ],
    startTime: null,
  }

  getRandomSentence(): string {
    const randomIndex = Math.floor(Math.random() * this.gameState.sentences.length)
    return this.gameState.sentences[randomIndex]
  }

  getAdjustedTime(sentence: string): number {
    return 5000 + 1000 * Math.floor(sentence.length / 3)
  }

  setStartTime(startTime: Date | null): void {
    this.gameState.startTime = startTime
  }

  getStartTime(): Date | null {
    return this.gameState.startTime
  }
}
