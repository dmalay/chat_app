import express from 'express'
import cors from 'cors'
import path from 'path'
import http from 'http'
import passport from 'passport'

import router from './router'
import mongooseService from './services/mongoose'
import jwtStrategy from './services/passport'

import Chat from './models/chat.model'
import User from './models/user.model'

const app = express()
const port = process.env.PORT || 5000

mongooseService.connect()

const middleware = [
  cors(),
  passport.initialize(),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  router
]

passport.use('jwt', jwtStrategy)

middleware.forEach((it) => app.use(it))


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', function(req, res) {
    res.sendFile(join(__dirname, 'client/build', 'index.html'))
  })
}

const server = http.createServer(app)

server.listen(port, (error) => {
  if (error) throw error
  console.log(`Server is running on http://localhost:${port}`)
})
