import { Server } from "socket.io"
import Message from "../models/message.model"
import { MessageModel } from "../models/message.model"

const users = new Map()
const userSockets = new Map()

const SocketIO = (server) => {
  const io = new Server(server)

  io.on("connection", (socket) => {

    //user connected
    socket.on("join", async (user) => {
      let sockets = []

      if(users.has(user._id)) {
        const existingUser = users.get(user._id)
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]]
        users.set(user._id, existingUser)
        sockets = [...existingUser.sockets, ...[socket.id]]
        userSockets.set(socket.id, user._id)
      } else {
        users.set(user._id, { _id: user._id, sockets: [socket.id]})
        userSockets.set(socket.id, user._id)
        sockets.push[socket.id]

        // console.log('userSocketHas>>>', userSockets.has(socket.id))
        // console.log('UserstHas>>>', users.has(user._id))
        // console.log(socket.id)
        // console.log('sockets-join>>>', sockets)
      }
    })

    socket.on('message', async (message) => {
      let sockets =[]
      if (users.has(message.fromUser._id)) {
        sockets = users.get(message.fromUser._id).sockets

        message.toSubscribers.forEach(it => {
          if(users.has(it._id)) {
            sockets = [...sockets, ...users.get(it._id).sockets]
          }
        })

        try{
          const msg = {
            text: message.text,
            fromUser: message.fromUser._id,
            name: message.fromUser.login,
            chatID: message.chatID
          }

          const newMessage = await MessageModel.create(msg)
          console.log(newMessage)
          io.to(sockets).emit('received', newMessage)

        } catch(e) {
          console.log(e)
        }
      }
    })

    socket.on('typing', async (message) => {
      message.toSubscribers.forEach((it) => {
        if(users.has(it._id)) {
          users.get(it._id).sockets.forEach((socket => {
            console.log(message)
            io.to(socket).emit('typing', message)
          }))
        }

      })
    })

    //used disconnected(browser closed)
    socket.on("disconnect", async () => {
      if (userSockets.has(socket.id)) {
        const user = users.get(userSockets.get(socket.id))
 console.log("disconnect",user, socket.id)
        userSockets.delete(socket.id)
        users.delete(user._id)
      }
    })
  })
}

export default SocketIO
