export class PlayerModel {
  public progress: string
  public wpm: number
  public accuracy: number

  constructor(
    public id: string,
    public name: string,
  ) {
    this.progress = ''
    this.wpm = 0
    this.accuracy = 0
  }
}
