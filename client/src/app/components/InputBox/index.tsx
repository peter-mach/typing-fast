import React, { useEffect } from 'react'

import { useCompetitionService } from '@/app/services/competitionService'
import { useRoundStore } from '@/app/stores/roundStore'
import { observer } from 'mobx-react-lite'

import ProgressBg from '../ProgressBg'

const InputBox: React.FC = observer(() => {
  const { error, correct, sentence, progress, roundEndTime } = useRoundStore()
  const competitionService = useCompetitionService()
  const roundTimeSeconds = (roundEndTime - new Date().getTime()) / 1000

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      competitionService.handleKeyPress(event.key)
    }
    window.addEventListener('keypress', handleKeyPress)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  }, [])

  return (
    <div className="rounded-lg bg-white shadow px-5 py-6 sm:px-6 relative">
      <ProgressBg key={sentence} seconds={roundTimeSeconds} />
      <span
        className={`relative z-10 block bg-white ring-gray-300 w-full rounded-md border-0 p-3 text-xl shadow-sm ring-2 ring-inset sm:leading-6 ${error ? 'ring-red-500' : ''} ${progress ? 'text-gray-900' : 'text-gray-400'} ${correct ? 'ring-yellow-500' : ''}`}
      >
        {!progress ? 'Type above sentence as fast as you can' : progress}
      </span>
    </div>
  )
})

export default InputBox
