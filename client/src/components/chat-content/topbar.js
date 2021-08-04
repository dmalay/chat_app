import React from "react"
import { useSelector } from "react-redux"

const Topbar = () => {
  const loadedChat = useSelector((s) => s.auth.currentChat)
  const { chats } = useSelector((s) => s.chat)
  const { defaultChatID } = useSelector((s) => s.auth.user)
  const currChat = chats.find((it) => it._id === defaultChatID)
  return (
    <div className="flex items-center border-b px-6 py-2">
      <div className="flex flex-col">
        <h3 className="text-gray-800 text-md mb-1 font-extrabold">
          #{typeof currChat === "undefined" ? loadedChat.name : currChat.name}
        </h3>
        <div className="text-gray-600 font-light text-sm">
          {typeof currChat === "undefined" ? loadedChat.title : currChat.title}
        </div>
      </div>
    </div>
  )
}

export default Topbar
