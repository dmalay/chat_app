import { Server } from "socket.io"
import { MessageModel } from "../models/message.model"

import onlineHandler, { usersOnline } from "./onlineHandler"

const SocketIO = (server) => {
  const io = new Server(server)

  io.on("connection", (socket) => {
    //user connected
    socket.on("join", async (user) => {
      try {
        onlineHandler.add(socket.id, user._id)
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
        const sockets = onlineHandler.getAllUsers()
        console.log(newMessage)
        io.emit("received", newMessage)
      } catch (e) {
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
        const userSockets = onlineHandler.getAllSocketsByUserId(user._id)
        userSockets.forEach((sock) => {
          if (sock === socket.id) {
            onlineHandler.delete(socket.id)
          } else {
            io.to(sock).emit("logged out", sock)
          }
        })
      } catch (e) {
        console.log(e)
      }
    })

    socket.on("disconnect", async () => {
      //user disconnected(browser closed)
      try {
        onlineHandler.delete(socket.id)
      } catch (e) {
        console.log(e)
      }
    })
  })
}

export default SocketIO
