# Real-time Typing Competition Platform

This is a real-time typing competition platform that allows players to compete against each other in typing challenges. The application presents players with a sentence to type within a fixed time limit, and provides real-time updates on player progress, words per minute (WPM), and accuracy.

## Features

- Real-time updates of player results and stats
- Players can join the competition and are displayed in the main player's table
- Fixed-time rounds calculated based on sentence length
- Each round presents a new sentence for players to type
- Metrics and stats for active players:
  - Words per minute (WPM) - correctly typed words per minute
  - Accuracy - percentage of correctly typed characters
- Player results are saved and loaded when the same player rejoins
- Frontend built with TypeScript, Next.js, React, MobX, Tailwind CSS, and Socket.IO
- Backend built with TypeScript, Express.js, Socket.IO

## Assumptions and Simplifications

- The application assumes a single competition room and does not support multiple concurrent competitions
- Player authentication and authorization are not implemented
- The application uses in-memory storage for player and competition data, without persistent storage

## Tech Stack
### Frontend:
   - TypeScript
   - Next.js
   - React
   - MobX
   - Tailwind CSS
   - socket.io
   - React Testing Library
   - Jest
   - Cypress

### Backend:
   - TypeScript
   - Express.js
   - socket.io
   - Jest

## How to Run the Application

### Backend

1. Navigate to the `server` directory
2. Install dependencies with `npm install`
3. Build the TypeScript code with `npm run dev`

The backend server will run on `http://localhost:3003`.

### Frontend

1. Navigate to the `client` directory
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

The frontend application will be accessible at `http://localhost:3000`.

## Code Structure

### Backend

- `server.ts`: Main entry point for the backend server
- `serverSocket.ts`: Sets up Socket.IO server and handles client connections
- `controllers/competitionController.ts`: Manages the competition flow and handles Socket.IO events
- `services/competitionService.ts`: Provides business logic for the competition
- `models/`: Contains data models for competition, round, player, and sentence
- `types/`: Defines TypeScript types and enums used in the backend
- `utils/`: Contains utility functions

### Frontend

- `app/page.tsx`: Main page component for the typing competition
- `app/components/`: Contains reusable UI components
  - `Header/`: Renders the header with the current sentence
  - `InputBox/`: Renders the input box for typing and handles user input
  - `ProgressBg/`: Renders the progress background for the typing input
  - `Scoreboard/`: Renders the scoreboard with player stats
- `app/services/competitionService.ts`: Handles Socket.IO communication and competition logic
- `app/stores/`: Contains MobX stores for managing application state
  - `playerStore.ts`: Manages player-related state
  - `roundStore.ts`: Manages round-related state
- `app/types/`: Defines TypeScript types and enums used in the frontend

## Potential Improvements

- Implement user authentication and authorization
- Add support for multiple concurrent competitions
- Integrate with a persistent storage solution (e.g., MongoDB) for storing player and competition data
- Enhance error handling and cover more edge cases
- Implement comprehensive unit tests and end-to-end tests for both frontend and backend
- Optimize the application for large-scale usage and improve performance
- Add additional features such as leaderboards, player profiles, and social sharing

Feel free to explore the codebase and make any necessary modifications or enhancements.