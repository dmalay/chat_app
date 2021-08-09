import React from "react"
import { useSelector } from "react-redux"

import MessageForm from "./message-form"

const ChatMessages = ({ actualChat, currentChat }) => {
  const { messages } = actualChat

  return (
    <>
    <div className="px-6 py-4 flex-1 flex-auto overflow-scroll-x overflow-y-auto">
      {actualChat?._id && currentChat?._id === actualChat._id
      ?
      messages.map((it) => {
        return <MessageForm key={it._id} text={it.text} userId={it.fromUser} time={it.reatedAt}/>
      })
    : null }
    </div>
    </>
  )
}

export default ChatMessages
