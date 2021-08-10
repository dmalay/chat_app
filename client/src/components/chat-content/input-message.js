import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { submitMessage } from "../../redux/actions/chat.actions"

const InputMessage = ({ user, currentChat }) => {
  const dispatch = useDispatch()

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
        dispatch(submitMessage(e.target.value))
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
