import express from 'express'
import http from 'http'

import { ServerSocket } from './serverSocket'

const app = express()
const server = http.createServer(app)
// eslint-disable-next-line
const serverSocket = new ServerSocket(server)

const PORT = process.env.PORT || 3003

app.get('/', (req, res) => {
  res.send('Real-time Writing Competition Server')
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
