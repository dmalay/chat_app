import React, { useState } from "react"
import { useSelector } from "react-redux"

const InputMessage = ({ user, currentChat }) => {
  const { socket, sender } = useSelector((s) => s.chat)
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

  const handleMessage = (e) => {
    const value = e.target.value
    setMessage(value)

    const receiver = {
      chatId: currentChat._id,
      fromUser: user,
      toSubscribers: currentChat.subscribers
    }
    console.log('receiver>', receiver)
    if(value.length === 1) {  //prevent emiting on every keystroke, first letter is enough to inform of 'typing..'
      receiver.typing = true
      socket.emit('typing', receiver)
    }
    if(value.length === 0) {
      receiver.typing = false
      socket.emit('typing', receiver)
    }

  }

  return (
    <>
      {sender.typing && sender.chatId === currentChat._id && sender.fromUser._id !== user._id
      ?  
      <div className="flex italic font-light text-red-500 justify-start mx-12 transparent">
        {sender.fromUser.login} is typing...
      </div>

       : null
       }
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
        onChange={handleMessage}
        onKeyDown={sendInput}
      />
    </div>
    </>
  )
}

export default InputMessage
