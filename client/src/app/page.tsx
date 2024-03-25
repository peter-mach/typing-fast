'use client'

import { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Header from './components/Header'
import InputBox from './components/InputBox'
import Scoreboard from './components/Scoreboard'
import { GameService } from './services/gameService'
import { useGameStore } from './stores/gameStore'

const HomePage: React.FC = observer(() => {
  const {
    currentSentence,
    typedText,
    error,
    roundTime,
    progressBgKey,
    wpm,
    accuracy,
    setCurrentSentence,
    setTypedText,
    setError,
    setRoundTime,
    setProgressBgKey,
    setWpm,
    setAccuracy,
  } = useGameStore()

  const gameService = new GameService()

  const calculateWpm = useCallback(() => {
    const startTime = gameService.getStartTime()
    if (!startTime) return
    const endTime = new Date()
    const timeDiff = (endTime.getTime() - startTime.getTime()) / 60000
    const wordsTyped = typedText.trim().split(' ').filter(Boolean).length
    setWpm(timeDiff > 0 ? Math.round(wordsTyped / timeDiff) : 0)
  }, [typedText, setWpm, gameService])

  useEffect(() => {
    const correctChars = typedText.length
    const totalChars = currentSentence.length
    setAccuracy(correctChars / totalChars)

    if (typedText.split(' ').filter(Boolean).length > 1) {
      calculateWpm()
    }
  }, [typedText, currentSentence, calculateWpm, setAccuracy])

  useEffect(() => {
    const nextSentence = () => {
      const newSentence = gameService.getRandomSentence()
      console.log('NEXT SENTENCE:', newSentence)

      setCurrentSentence(newSentence)
      setTypedText('')
      gameService.setStartTime(new Date())
      setWpm(0)
      setAccuracy(1)
      setProgressBgKey(progressBgKey + 1)
    }

    const adjustedTime = gameService.getAdjustedTime(currentSentence)
    setRoundTime(Math.floor(adjustedTime / 1000))
    console.log('Adjusted  time: ', adjustedTime)

    const timerId = setTimeout(nextSentence, adjustedTime)

    return () => clearTimeout(timerId)
  }, [
    currentSentence,
    progressBgKey,
    setCurrentSentence,
    setTypedText,
    setWpm,
    setAccuracy,
    setProgressBgKey,
    setRoundTime,
    gameService,
  ])

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (currentSentence.startsWith(typedText + event.key)) {
        if (!gameService.getStartTime()) {
          gameService.setStartTime(new Date())
        }
        setTypedText(typedText + event.key)
        setError(false)
      } else {
        setError(true)
        setTimeout(() => setError(false), 500)
      }
    }

    window.addEventListener('keypress', listener)
    return () => {
      window.removeEventListener('keypress', listener)
    }
  }, [typedText, currentSentence, setTypedText, setError, gameService])

  console.log('rerender!')

  return (
    <>
      <Header />

      <main className="-mt-44">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <InputBox typedText={typedText} error={error} roundTime={roundTime} progressBgKey={progressBgKey} />
          <Scoreboard typedText={typedText} wpm={wpm} accuracy={accuracy} />
        </div>
      </main>
    </>
  )
})

export default HomePage
