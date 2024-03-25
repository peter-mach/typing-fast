import { v4 as uuidv4 } from 'uuid'

import { PlayerModel } from './player'

export class RoundModel {
  public id: string

  constructor(
    public sentence = '',
    public roundTime = 0,
    public roundStartTime = 0,
    public roundEndTime = 0,
    public players: PlayerModel[] = [],
  ) {
    this.id = uuidv4()
  }

  addPlayer(player: PlayerModel): void {
    this.players.push(player)
  }

  removePlayer(playerId: string): void {
    this.players = this.players.filter((player) => player.id !== playerId)
  }

  updatePlayerStats(playerId: string, progress: string, wpm: number, accuracy: number): void {
    const player = this.players.find((player) => player.id === playerId)
    if (player) {
      player.progress = progress
      player.wpm = wpm
      player.accuracy = accuracy
    }
  }
}
