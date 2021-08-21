import { Server } from "socket.io"
import Chat from "../models/chat.model"
import { MessageModel } from "../models/message.model"


import onlineHandler from "./onlineHandler"

const SocketIO = (server) => {
  const io = new Server(server)

  io.on("connection", (socket) => {
    //user connected
    socket.on("join", async (user) => {
      try {
        onlineHandler.add(socket.id, user._id)
        const usersOnline = onlineHandler.getAllUsers()
        io.emit("online", usersOnline)
      } catch (e) {
        console.log(e)
      }
    })

    socket.on("message", async (message) => {
      try {
        const msg = {
          text: message.text,
          fromUser: message.fromUser._id,
          name: message.fromUser.login,
          chatID: message.chatID,
        }
        const newMessage = await MessageModel.create(msg)
        io.emit("received", newMessage)
      } catch (e) {
        console.log(e)
      }
    })

    socket.on('chatDeleted', async (data) => {
      try{
        const { privateChatId, forUserId } = data
        const userSockets = onlineHandler.getAllSocketsByUserId(forUserId)
        userSockets.forEach((sock) => {
          io.to(sock).emit('chatDeleted', privateChatId )
        })
      } catch(e) {
        console.log(e)
      }
    })

    socket.on('chatCreated', async (data) => {
      try{
        const { chatId, forUserId } = data
        const chat = await Chat.findById(chatId)
        .populate("subscribers", ["login", "type"])
        const userSockets = onlineHandler.getAllSocketsByUserId(forUserId)
        userSockets.forEach((sock) => {
          io.to(sock).emit('chatCreated', chat)
        })
      } catch(e) {
        console.log(e)
      }
    })

    socket.on("typing", async (message) => {
      try {
        socket.broadcast.emit("typing", message)
      } catch (e) {
        console.log(e)
      }
    })

    socket.on("logout", async (user) => {
      //user logged out and explicitly disconnected all sessions
      try {
        //emit logout to every other user sessions
        const userSockets = onlineHandler.getAllSocketsByUserId(user._id)
        userSockets.forEach((sock) => {
          if (sock === socket.id) {
            onlineHandler.delete(socket.id)
          } else {
            io.to(sock).emit("logged out", sock)
          }
        })
        //emit offline status to all other sockets
        const sockets = onlineHandler.getAllSockets()
        sockets.forEach((it) => {
          if (it !== socket.id && !userSockets.includes(it)) {
            io.to(it).emit("offline", user._id)
          }
        })

      } catch (e) {
        console.log(e)
      }
    })

    socket.on("disconnect", async () => {
      //user disconnected(browser closed)
      try {
        const userId = onlineHandler.get(socket.id)
        const sockets = onlineHandler.getAllSockets()
        sockets.forEach((it) => {
          if (it !== socket.id) {
            io.to(it).emit("offline", userId)
          }
        onlineHandler.delete(socket.id)
        })
      } catch (e) {
        console.log(e)
      }
    })
  })
}

export default SocketIO
