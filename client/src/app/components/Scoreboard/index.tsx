import React from 'react'

interface ScoreboardProps {
  typedText: string
  wpm: number
  accuracy: number
}

const Scoreboard: React.FC<ScoreboardProps> = ({ typedText, wpm, accuracy }) => {
  return (
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
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Math.round(accuracy * 100)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Scoreboard
