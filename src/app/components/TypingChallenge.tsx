'use client'

import { useEffect, useState } from 'react'
import Loading from './Loading'
import Error from './Error'

export default function TypingChallenge() {
  const [sentence, setSentence] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)

  return (
    <div>
      <p>Sentence: {sentence}</p>
      <p>Time Left: {timeLeft} seconds</p>
      <input
        type="text"
        placeholder="Type the above sentence as fast as you can"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
      />
    </div>
  )
}
