import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Sidebar from "../components/sidebar/sidebar"
import ChatContent from "../components/chat-content/chat-content"

import { fetchChats  } from "../redux/actions/chat.actions"

const Main = () => {
  const dispatch = useDispatch()
  const { _id, currentChat } = useSelector((s) => s.auth.user)

  useEffect(() => {
    dispatch(fetchChats())

  }, [dispatch])


  return (
    <div className="w-full h-screen shadow bg-white">
      <div className="flex">
        <Sidebar />
        <ChatContent />
      </div>
    </div>
  )
}

export default Main
