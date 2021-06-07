import express from 'express'
import cors from 'cors'
import path from 'path'

const server = express()
const port = process.env.PORT || 5000

const middleware = [
  cors(),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true })
]

middleware.forEach((it) => server.use(it))

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')))
  server.get('*', function(req, res) {
    res.sendFile(join(__dirname, 'client/build', 'index.html'))
  })
}

server.listen(port, (error) => {
  if (error) throw error
  console.log(`Server is running on http://localhost:${port}`)
})
