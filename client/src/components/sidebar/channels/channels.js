import React from "react"
import { useSelector } from "react-redux"

import ChannelList from "./channel-list"

import { changeCurrentChat } from "../../../redux/actions/auth.actions"

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
              changeChat={changeCurrentChat}
              isChatCurrent={it._id === defaultChatID}
            />
          )
        }
      })}
    </div>
  )
}

export default Channels
