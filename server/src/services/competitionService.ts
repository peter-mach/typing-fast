import { CompetitionModel } from '../models/competition'
import { PlayerModel } from '../models/player'
import { RoundModel } from '../models/round'
import { SentenceModel } from '../models/sentence'
import { getRoundTimeFromSentence } from '../utils/utils'

export class CompetitionService {
  private competitionModel: CompetitionModel
  private sentenceModel: SentenceModel

  constructor() {
    this.competitionModel = new CompetitionModel()
    this.sentenceModel = new SentenceModel()
  }

  getActiveRound(): RoundModel | null {
    return this.competitionModel.activeRound
  }

  getNextSentence(): string {
    return this.sentenceModel.getNextSentence()
  }

  addPlayer(id: string, name: string): PlayerModel {
    // get existing player or create player
    let player = this.competitionModel.getPlayer(id)
    if (!player) {
      player = new PlayerModel(id, name)
      this.competitionModel.addPlayer(player)
    }
    this.competitionModel.activeRound?.addPlayer(player)
    return player
  }

  removePlayer(playerId: string): void {
    this.competitionModel.activeRound?.removePlayer(playerId)
  }

  updatePlayerStats(playerId: string, progress: string, wpm: number, accuracy: number): void {
    this.competitionModel.activeRound?.updatePlayerStats(playerId, progress, wpm, accuracy)
  }

  startCompetitionRound(): void {
    const sentence = this.getNextSentence()
    console.log('Start Competition round with sentence: ', sentence)

    const roundTime = getRoundTimeFromSentence(sentence)
    const roundStartTime = new Date().getTime()
    const roundEndTime = roundStartTime + roundTime

    this.competitionModel.newRound(sentence, roundTime, roundStartTime, roundEndTime)
  }

  endCompetition(): void {
    this.competitionModel.removeActiveRound()
  }
}
