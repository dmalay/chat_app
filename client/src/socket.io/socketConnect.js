import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import SocketIOClient from "socket.io-client"
import { fetchChats, setSocket, receivedMessage, senderTyping, resetSocket } from "../redux/actions/chat.actions"
import {logout} from "../redux/actions/auth.actions"

function useSocket(user, dispatch) {
  const { isLoggedIn } = useSelector((s) => s.auth)

  useEffect(() => {
    dispatch(fetchChats())
    .then( res=> {
      const socket = SocketIOClient.connect()
      dispatch(setSocket(socket))
      
      
      socket.emit("logout", user, () => {
        socket.disconnect()
        dispatch(resetSocket())
      })
      
      socket.on("logged out", (sock) => {
        console.log(`logged ut somewhere, ${sock}`)
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
