import React from "react"
import { useSelector } from "react-redux"

import MessageForm from "./message-form"

const ChatMessages = () => {
  const { messages } = useSelector((s) => s.chat)
  return (
    <>
    <div className="px-6 py-4 flex-1 flex-auto overflow-scroll-x overflow-y-auto">
      {messages.map((it) => {
        return <MessageForm key={it.time} message={it} />
      })}
    </div>
    </>
  )
}

export default ChatMessages
