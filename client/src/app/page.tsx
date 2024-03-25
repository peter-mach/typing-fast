'use client'

import { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'

import Header from './components/Header'
import InputBox from './components/InputBox'
import Loading from './components/Loading'
import PlayerNameInput from './components/PlayerNameInput'
import Scoreboard from './components/Scoreboard'
import { useCompetitionService } from './services/competitionService'
import { usePlayerStore } from './stores'

const HomePage: React.FC = observer(() => {
  const [initialized, setInitialized] = useState(false)
  const playerStore = usePlayerStore()
  const competitionService = useCompetitionService()

  useEffect(() => {
    competitionService.initialize()
    setInitialized(true)

    return () => competitionService.destroy()
  }, [competitionService])

  if (!initialized) {
    return <Loading />
  }

  if (initialized && !playerStore.playerName) {
    return <PlayerNameInput />
  }

  return (
    <>
      <Header />

      <main className="-mt-44">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <InputBox />
          <Scoreboard />
        </div>
      </main>
    </>
  )
})

export default HomePage
