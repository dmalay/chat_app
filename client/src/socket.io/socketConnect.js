import React, { useEffect } from "react"
import SocketIOClient from "socket.io-client"
import { fetchChats, setSocket, receivedMessage, senderTyping, resetSocket, setOnline, setOffline } from "../redux/actions/chat.actions"
import { logout } from "../redux/actions/auth.actions"

function useSocket(user, dispatch) {

  useEffect(() => {
    dispatch(fetchChats())
    .then( res=> {
      const socket = SocketIOClient.connect()
      dispatch(setSocket(socket))
      
      socket.emit("join", user)
      
      socket.on("logged out", () => {
        console.log(`logged out somewhere`)
            socket.disconnect()
            dispatch(logout())
            dispatch(resetSocket())        
      })
      
      
      socket.on("received", (message) => {
        console.log("received:", message, user._id)
        dispatch(receivedMessage(message, user._id))
      })

      socket.on('typing', (sender) => {
        console.log('typing:', sender)
        dispatch(senderTyping(sender))
      })

            
      socket.on('online', (online) =>{
            console.log('online', online)
            dispatch(setOnline(online))
        })
        
        socket.on('offline', (userId) =>{
              console.log('offline', userId)
              dispatch(setOffline(userId))
          })
          
          // console.log(res)
        })
        
  }, [dispatch])
}

export default useSocket
