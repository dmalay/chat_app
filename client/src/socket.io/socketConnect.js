import React, { useEffect } from "react"
import SocketIOClient from "socket.io-client"
import { fetchChats, setSocket, receivedMessage, senderTyping, resetSocket } from "../redux/actions/chat.actions"
import { logout } from "../redux/actions/auth.actions"

function useSocket(user, dispatch) {

  useEffect(() => {
    dispatch(fetchChats())
    .then( res=> {
      const socket = SocketIOClient.connect()
      dispatch(setSocket(socket))
      
      
      socket.on("logged out", () => {
        console.log(`logged out somewhere`)
            socket.disconnect()
            dispatch(logout())
            dispatch(resetSocket())        
      })
      
      socket.emit("join", user)
      
      socket.on("received", (message) => {
        console.log("received:", message, user._id)
        dispatch(receivedMessage(message, user._id))
      })

      socket.on('typing', (sender) => {
        console.log('typing:', sender)
        dispatch(senderTyping(sender))
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
