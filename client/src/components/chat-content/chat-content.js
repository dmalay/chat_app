import React from 'react'

import Topbar from './topbar'
import ChatMessages from './chat-messages/chat-messages'
import InputMessage from './input-message'

const ChatContent = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Topbar />
      <ChatMessages />
      <InputMessage />
    </div>
  )
}

export default ChatContent
