import { Server } from "socket.io"

const users = new Map()
const userSockets = new Map()


const SocketIO = (server) => {
  const io = new Server(server)

  io.on("connection", (socket) => {

    //user connected
    socket.on("join", async (user) => {
      let sockets = []
      userSockets.set(socket.id, user._id)
      users.set(user._id, { id: user._id, sockets: [socket.id]})
      sockets.push[socket.id]
 

      io.to(socket.id).emit("typing", "user typing...")
    })

    //used disconnected(browser closed)
    socket.on("disconnect", async () => {
      if (userSockets.has(socket.id)) {
        const user = users.get(userSockets.get(socket.id))
 
        userSockets.delete(socket.id)
        users.delete(user._id)
      }
    })
  })
}

export default SocketIO
