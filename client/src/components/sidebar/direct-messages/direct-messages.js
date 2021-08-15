import React from 'react'
import { useSelector } from 'react-redux'

import DirectMessagesForm from './direct-messages-form'

import { setDefaultChat } from "../../../redux/actions/auth.actions"
import { changeActualChat } from "../../../redux/actions/chat.actions"

const DirectMessages = () => {
  const { _id, defaultChatID } = useSelector((s) => s.auth.user)
  const { chats } = useSelector((s) => s.chat)
  const actualChatId =useSelector((s) => s.chat.actualChat._id)

  return (
    <div className="mb-4">
      {chats.map((chat) => {
        if (chat.type === "private") {
          const isChatCorrect = Boolean(chat.subscribers.find(it => it._id === _id))
          return (
            isChatCorrect &&
            <DirectMessagesForm
              key={chat._id}
              chat={chat}
              authId={_id}
              setNewChat={[setDefaultChat, changeActualChat]}
              isChatCurrent={chat._id === actualChatId}
            />
          )
        }
      })}
    </div>
  )
}

export default DirectMessages
