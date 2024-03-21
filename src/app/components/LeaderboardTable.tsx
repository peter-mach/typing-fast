import { useEffect, useState } from 'react';
import Loading from './Loading';

interface IEntry {
  playerName: string;
  wordsPerMinute: number;
  accuracy: number;
}

export default function LeaderboardTable() {
  const leaderboard = [];
  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Words per Minute</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{entry.playerName}</td>
              <td>{entry.wordsPerMinute}</td>
              <td>{entry.accuracy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
