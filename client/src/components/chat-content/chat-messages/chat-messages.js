import React from 'react'

import MessageForm from './message-form'

const ChatMessages = () => {
  return (
    <div className="px-6 py-4 flex-1 overflow-scroll-x">
      <MessageForm />
    </div>
  )
}

export default ChatMessages
