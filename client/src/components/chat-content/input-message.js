import React, { useState } from "react"
import { useSelector } from "react-redux"

const InputMessage = ({ user, currentChat }) => {
  const { socket } = useSelector((s) => s.chat)
  const [message, setMessage] = useState("")

  const sendInput = (e) => {
    if (message) {
      const msg = {
        text: message,
        fromUser: user,
        toSubscribers: currentChat.subscribers,
        chatID: user.defaultChatID,
      }
      if (e.key === "Enter" || e.type === "click") {
        setMessage("")
        socket.emit("message", msg)
      }
    }
  }

  return (
    <div className="flex m-6 mt-0 rounded-lg border-2 border-gray-500 bg-white">
      <button
        type="button"
        className="text-3xl text-gray-500 px-3 py-1 border-r-2 border-gray-500 hover:text-gray-900 cursor-pointer"
        value={message}
        onClick={sendInput}
      >
        +
      </button>
      <input
        type="text"
        value={message}
        placeholder={`Message to # ${
          typeof currentChat !== "undefined" ? currentChat.name : ""
        }`}
        className="w-full px-4"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={sendInput}
      />
    </div>
  )
}

export default InputMessage
