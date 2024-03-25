import { PlayerModel } from './player'
import { RoundModel } from './round'

const DATA_CAP = 10000

export class CompetitionModel {
  // all payers that ever joined the server (capped on 10000)
  public allPlayers: PlayerModel[]
  // all rounds played on the server (capped on 10000)
  public pastRounds: RoundModel[]
  // currently played round
  public activeRound: RoundModel | null

  constructor() {
    this.allPlayers = []
    this.pastRounds = []
    this.activeRound = null
  }

  addPlayer(player: PlayerModel): void {
    this.allPlayers.push(player)
    if (this.allPlayers.length >= DATA_CAP) {
      this.allPlayers.shift()
    }
  }

  getPlayer(playerId: string): PlayerModel | undefined {
    const player = this.allPlayers.find((player) => player.id === playerId)
    if (player) {
      player.progress = ''
    }
    return player
  }

  isRoundActive(): boolean {
    return !!this.activeRound
  }

  archiveRound(round: RoundModel) {
    round.players
    this.pastRounds.push(round)
    if (this.pastRounds.length >= DATA_CAP) {
      this.pastRounds.shift()
    }
  }

  newRound(sentence: string, roundTime: number, roundStartTime: number, roundEndTime: number): void {
    console.log('New Round Params:', sentence, roundTime, roundStartTime, roundEndTime)

    const newRound = new RoundModel(sentence, roundTime, roundStartTime, roundEndTime)

    if (this.activeRound) {
      // copy all players from previous round to the new one
      newRound.players = [...this.activeRound.players]
      // reset progress for each
      newRound.players.forEach((p) => (p.progress = ''))

      this.archiveRound(this.activeRound)
    }

    this.activeRound = newRound
  }

  removeActiveRound() {
    this.activeRound = null
  }
}
