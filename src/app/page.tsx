'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import ProgressBg from './components/ProgressBg'

export default function Home() {
  const sentences = [
    'The quick brown fox jumps over the lazy dog.',
    'All their equipment and instruments are alive.',
    'A watched pot never boils.',
    'Humpty Dumpty sat on a wall.',
    'Jack and Jill went up the hill.',
  ]
  const [currentSentence, setCurrentSentence] = useState(sentences[0])
  const [typedText, setTypedText] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(1)
  const [roundTime, setRoundTime] = useState(0)
  const [timer, setTimer] = useState(null)
  const [error, setError] = useState(false)
  const [progressBgKey, setProgressBgKey] = useState(1)

  const calculateWpm = useCallback(() => {
    if (!startTime) return
    const endTime = new Date()
    const timeDiff = (endTime - startTime) / 60000 // in minutes
    const wordsTyped = typedText.trim().split(' ').filter(Boolean).length
    setWpm(timeDiff > 0 ? Math.round(wordsTyped / timeDiff) : 0)
  }, [typedText, startTime])

  useEffect(() => {
    const correctChars = typedText.length
    const totalChars = currentSentence.length
    setAccuracy(correctChars / totalChars)

    if (typedText.split(' ').filter(Boolean).length > 1) {
      // Calculate WPM after first word
      calculateWpm()
    }
  }, [typedText, currentSentence, calculateWpm])

  useEffect(() => {
    const nextSentence = () => {
      const newIndex = Math.floor(Math.random() * sentences.length)
      setCurrentSentence(sentences[newIndex])
      setTypedText('')
      setStartTime(new Date())
      setWpm(0)
      setAccuracy(1)
      setProgressBgKey(progressBgKey + 1)
    }

    // Adjust timer based on sentence length, e.g., 5 seconds + 1 additional second for every 5 characters
    const adjustedTime = 5000 + 1000 * Math.floor(currentSentence.length / 3)
    setRoundTime(Math.floor(adjustedTime / 1000))
    const timerId = setTimeout(nextSentence, adjustedTime)
    setTimer(timerId)

    return () => clearTimeout(timerId)
  }, [currentSentence])

  useEffect(() => {
    const listener = (event) => {
      if (event.key === 'Backspace') {
        setTypedText(typedText.slice(0, -1))
      } else if (!currentSentence.startsWith(typedText + event.key)) {
        // If a mistake is made, flash the border to red
        setError(true)
        // Reset error state after 500ms to flash the border color
        setTimeout(() => setError(false), 500)
      } else {
        if (!startTime) {
          setStartTime(new Date())
        }
        setTypedText(typedText + event.key)
        // Ensure error is cleared if correct key is pressed next
        setError(false)
      }
    }

    window.addEventListener('keypress', listener)
    return () => {
      window.removeEventListener('keypress', listener)
    }
  }, [typedText, currentSentence, startTime])

  return (
    <>
      <header className="bg-gray-800 pb-44">
        <div className="bg-gray-800">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex h-16 items-center justify-center px-4 sm:px-0">
                <div className="flex items-center">
                  <a
                    href="#"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    TypingFast
                  </a>
                  <Image className="h-16 w-16" width={64} height={64} src="/logo.png" alt="TypingFast logo" />
                  <a
                    href="#"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Competition
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 id="sentence" className="text-3xl font-bold tracking-tight text-white">
              {currentSentence}
            </h1>
          </div>
        </div>
      </header>
      <main className="-mt-44">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          {/* Input box */}
          <div className="rounded-lg bg-white shadow px-5 py-6 sm:px-6 relative">
            <ProgressBg key={progressBgKey} seconds={roundTime} />
            <input
              name="input"
              id="input"
              className={`relative z-10 block w-full rounded-md border-0 p-3 text-xl text-gray-900 shadow-sm ring-2 ring-inset ${
                error ? 'ring-red-500' : 'ring-gray-300'
              } placeholder:text-gray-400 focus:ring-4 focus:ring-inset ${
                error ? 'focus:ring-red-500' : 'focus:ring-yellow-500'
              } focus:outline-none sm:leading-6`}
              placeholder="Type above sentence as fast as you can"
              value={typedText}
              onChange={() => {}}
              autoComplete="off"
              autoFocus
            />
          </div>
          {/* Scoreboard */}
          <div className="mt-8 rounded-lg bg-white shadow sm:px-0 sm:py-0 md:px-5 md:py-6 lg:px-8">
            <div className="inline-block min-w-full py-2 align-middle sm:py-0">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        style={{ width: '40%' }}
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Live progress
                      </th>
                      <th
                        scope="col"
                        style={{ width: '30%' }}
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Player name
                      </th>
                      <th
                        scope="col"
                        style={{ width: '15%' }}
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Words per minute
                      </th>
                      <th
                        scope="col"
                        style={{ width: '15%' }}
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Accuracy
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {typedText}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Player One</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{wpm}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {Math.round(accuracy * 100)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
