export interface IPlayerStats {
  id: string
  name: string
  progress: string
  wpm: number
  accuracy: number
}
export interface IRoundUpdate {
  id: string
  players: IPlayerStats[]
  roundEndTime: number
  roundStartTime: number
  roundTime: number
  sentence: string
}

export enum ESocketEventsOn {
  ROUND_START = 'roundStart',
  ROUND_UPDATE = 'roundUpdate',
  ROUND_END = 'roundEnd',
  PLAYER_STATS = 'playerStats',
  PLAYERS_STATS = 'playersStats',
}

export enum ESocketEventsEmit {
  PLAYER_JOINED = 'playerJoined',
  PLAYER_STATS = 'playerStats',
}
