import React from 'react'
import { useSelector } from 'react-redux'
import DirectMessagesForm from './direct-messages-form'

import UsersList from './users-list'

const DirectMessages = () => {
  const { user } = useSelector((s) => s.auth)
  const { chats } = useSelector((s) => s.chat)

  return (
    <div className="mb-4">
      {chats.map((chat) => {
        if (chat.type === "private") {
          return (
            <DirectMessagesForm
              key={chat._id}
              chat={chat}
              // _id={it._id}
              // setNewChat={[setDefaultChat, changeActualChat]}
              // isChatCurrent={it._id === defaultChatID}
            />
          )
        }
      })}
    </div>
  )
}

export default DirectMessages
