import React from "react"

import Sidebar from "../components/sidebar/sidebar"
import ChatContent from "../components/chat-content/chat-content"

const Main = () => {
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
