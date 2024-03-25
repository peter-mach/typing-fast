export function getRoundTimeFromSentence(sentence: string): number {
  return 5000 + 1000 * Math.floor(sentence.length / 3)
}
