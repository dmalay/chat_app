import React from "react"
import { useSelector } from "react-redux"

import ChannelList from "./channel-list"

import { setDefaultChat } from "../../../redux/actions/auth.actions"
import { changeActualChat } from "../../../redux/actions/chat.actions"

const Channels = () => {
  const { chats, unreadMessages } = useSelector((s) => s.chat)
  const { _id, defaultChatID } = useSelector((s) => s.auth.user)

  return (
    <div className="mb-4">
      {chats.map((it) => {
        const ID = it.subscribers.find(it => it._id === _id)
        if (ID && it.type === "public") {
          return (
            <ChannelList
              key={it._id}
              name={it.name}
              _id={it._id}
              setNewChat={[setDefaultChat, changeActualChat]}
              isChatCurrent={it._id === defaultChatID}
              hasUnreadMsg={unreadMessages[it._id]}
            />
          )
        }
      })}
    </div>
  )
}

export default Channels
