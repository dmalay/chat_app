import React from "react"
import { useSelector } from "react-redux"

import ChannelList from "./channel-list"

import { setDefaultChat } from "../../../redux/actions/auth.actions"
import { changeActualChat } from "../../../redux/actions/chat.actions"

const Channels = () => {
  const { chats } = useSelector((s) => s.chat)
  const { _id, defaultChatID } = useSelector((s) => s.auth.user)

  return (
    <div className="mb-4">
      {chats.map((it) => {
        if (it.subscribers.includes(_id)) {
          return (
            <ChannelList
              key={it._id}
              name={it.name}
              _id={it._id}
              setNewChat={[setDefaultChat, changeActualChat]}
              isChatCurrent={it._id === defaultChatID}
            />
          )
        }
      })}
    </div>
  )
}

export default Channels
