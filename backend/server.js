import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/dbconfig.js'
import problemRoutes from './routes/problemsRoute.js'
import testRoutes from './routes/testRoute.js'
import compileRoutes from './routes/compileRoute.js'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import ACTIONS from '../frontend/src/Actions.js'
const app = express()
const server = http.createServer(app)
const io = new Server(server)

//ESSENTIALS
dotenv.config()
connectDB()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

//ROUTES
app.get('/', (req, res) => {
  res.send('API is running...')
})
app.use('/api/test', testRoutes)
app.use('/api/problems', problemRoutes)
app.use('/api/compile', compileRoutes)

//add this to database
let userSocketMap = {}

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      }
    }
  )
}

io.on('connection', (socket) => {
  console.log('socket connected', socket.id)

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username
    socket.join(roomId)
    const clients = getAllConnectedClients(roomId)
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      })
    })
  })

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code })
  })

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms]
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      })
    })
    delete userSocketMap[socket.id]
    socket.leave()
  })
})

const PORT = process.env.PORT || 5000

server.listen(
  PORT,
  console.log(`server running in ${process.env.MODE} mode on port ${PORT}`)
)
