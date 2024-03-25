import React from 'react'
import Image from 'next/image'
import { observer } from 'mobx-react-lite'
import { useGameStore } from '@/app/stores/gameStore'

const Header: React.FC = observer(() => {
  const { currentSentence } = useGameStore()

  return (
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
  )
})

export default Header
