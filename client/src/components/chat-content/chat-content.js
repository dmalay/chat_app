import React from 'react'

import Topbar from './topbar'
import ChatMessages from './chat-messages/chat-messages'
import InputMessage from './input-message'

const ChatContent = () => {
  return (
    <div>
      <Topbar />
      <ChatMessages />
      <InputMessage />
      this is ChatContent
    </div>
  )
}

export default ChatContent
