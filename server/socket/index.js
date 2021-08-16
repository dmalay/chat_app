import { Server } from "socket.io"
import Message from "../models/message.model"
import { MessageModel } from "../models/message.model"

import onlineHandler, { usersOnline } from "./onlineHandler"

// const users = {}

const SocketIO = (server) => {
  const io = new Server(server)

  io.on("connection", (socket) => {
    //user connected
    socket.on("join", async (user) => {
      onlineHandler.add(socket.id, user._id)
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
        const sockets = onlineHandler.getAllUsers()
        console.log(newMessage)
        io.emit("received", newMessage)
      } catch (e) {
        console.log(e)
      }
    })

    socket.on("typing", async (message) => {
      socket.broadcast.emit("typing", message)
    })

    socket.on("logout", async (user) => {
      const userSockets = onlineHandler.getAllSocketsByUserId(user._id)
      userSockets.forEach((sock) => {
        if (sock === socket.id) {
          onlineHandler.delete(socket.id)
        } else {
          io.to(sock).emit("logged out", sock)
        }
      })
    })

    socket.on("disconnect", async () => {
      //user disconnected(browser closed)
      console.log
      onlineHandler.delete(socket.id)
    })
  })
}

export default SocketIO
