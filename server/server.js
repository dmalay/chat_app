import express from 'express'
import cors from 'cors'
import path from 'path'
import http from 'http'

import mongooseService from './services/mongoose'

const app = express()
const port = process.env.PORT || 5000

mongooseService.connect()

const middleware = [
  cors(),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true })
]

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
