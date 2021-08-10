import React, { useEffect } from "react"
import SocketIOClient from "socket.io-client"
import { fetchChats, setSocket, receivedMessage } from "../redux/actions/chat.actions"

function useSocket(user, dispatch) {
  useEffect(() => {

    dispatch(fetchChats())
    .then(res=> {

      
      const socket = SocketIOClient.connect()
      
      dispatch(setSocket(socket))
      
      socket.emit("join", user)
      
      socket.on("received", (message) => {
        console.log("received:", message, user._id)
        dispatch(receivedMessage(message, user._id))
      })
      
      // socket.on('online', (it) =>{
        //     console.log('event:', it)
        // })
        
        // socket.on('offline', (it) =>{
          //     console.log('event:', it)
          // })
          
          // console.log(res)
        })
  }, [dispatch])
}

export default useSocket
