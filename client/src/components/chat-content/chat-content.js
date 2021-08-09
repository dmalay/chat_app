import React from 'react'
import { useDispatch, useSelector } from "react-redux"

import Topbar from './topbar'
import ChatMessages from './chat-messages/chat-messages'
import InputMessage from './input-message'

const ChatContent = () => {
  const { user } = useSelector((s) => s.auth)
  const { socket, chats, actualChat } = useSelector((s) => s.chat)

  const currentChat = chats.find((it) => it._id === user.defaultChatID)

  return (
    <div className="w-full h-screen flex flex-col">
      <Topbar currentChat={currentChat}/>
      <ChatMessages actualChat={actualChat} currentChat={currentChat}/>
      <InputMessage user={user} currentChat={currentChat}/>
    </div>
  )
}

export default ChatContent
