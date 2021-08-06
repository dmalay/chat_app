import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { submitMessage } from "../../redux/actions/chat.actions"

const InputMessage = () => {
  const dispatch = useDispatch()

  const [ message, setMessage ] = useState('')

  const sendInput = (e) => {
    if (message) {
      if (e.key === "Enter" || e.type === "click") {
        dispatch(submitMessage(e.target.value))
        setMessage("")
      }
    }
  }

  return (
    <div className="flex m-6 mt-0 rounded-lg border-2 border-gray-500">
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
        placeholder="Message to #general"
        className="w-full px-4"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={sendInput}
      />
    </div>
  )
}

export default InputMessage
