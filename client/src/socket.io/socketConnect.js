import React, { useEffect } from "react"
import SocketIOClient from "socket.io-client"
import { fetchChats, setSocket, receivedMessage } from "../redux/actions/chat.actions"

function useSocket(user, dispatch) {
  useEffect(() => {

      const socket = SocketIOClient.connect()

      dispatch(setSocket(socket))

      socket.emit("join", user)

      socket.on("received", (message) => {
        console.log("received:", message)
        dispatch(receivedMessage(message))
      })

      // socket.on('online', (it) =>{
      //     console.log('event:', it)
      // })

      // socket.on('offline', (it) =>{
      //     console.log('event:', it)
      // })


  }, [dispatch])
}

export default useSocket
