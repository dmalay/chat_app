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
      userSockets.set(socket.id, user._id)
      users.set(user._id, { id: user._id, sockets: [socket.id]})
      sockets.push[socket.id]
 

      io.to(socket.id).emit("typing", "user typing...")
    })

    socket.on('message', async (message) => {
      let sockets =[]
      if (users.has(message.fromUser._id)) {
        sockets = users.get(message.fromUser._id).sockets

        // console.log(message)

        message.toSubscribers.forEach(id => {
          if(users.has(id)) {

            // console.log('sockets:', sockets)

            sockets = [...sockets, ...users.get(id).sockets]
          }
        })

        try{
          const msg = {
            text: message.text,
            fromUser: message.fromUser._id,
            chatID: message.chatID
          }

          const newMessage = await new MessageModel(msg)

          console.log(newMessage)
          newMessage.save()
          io.to(sockets).emit('received', newMessage)


        } catch(e) {

        }


      }
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
