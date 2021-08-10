import React from "react"
import { useDispatch, useSelector } from "react-redux"

import Sidebar from "../components/sidebar/sidebar"
import ChatContent from "../components/chat-content/chat-content"
import useSocket from "../socket.io/socketConnect"

const Main = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((s) => s.auth)

  useSocket(user, dispatch)

  return (
    <div className=" flex w-screen h-screen shadow bg-white">
        <Sidebar />
        <ChatContent />
    </div>
  )
}

export default Main
