import React from 'react'
import ProgressBg from '../ProgressBg'

interface InputBoxProps {
  typedText: string
  error: boolean
  roundTime: number
  progressBgKey: number
}

const InputBox: React.FC<InputBoxProps> = ({ typedText, error, roundTime, progressBgKey }) => {
  return (
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
  )
}

export default InputBox
