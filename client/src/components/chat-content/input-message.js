import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMessage, submitMessage } from "../../redux/actions/chat.actions"

const InputMessage = () => {
  const dispatch = useDispatch()
  const { message } = useSelector((s) => s.chat)

  const sendInput = (e) => {
    if (message) {
      if (e.key === "Enter" || e.type === "click") {
        dispatch(submitMessage(e.target.value))
        dispatch(addMessage(""))
      }
    }
  }

  return (
    <div className="flex m-6 rounded-lg border-2 border-gray-500 overflow-hidden">
      <button
        type="button"
        className="text-3xl text-gray-500 px-3 py-1 border-r-2 border-gray-500 cursor-pointer"
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
        onChange={(e) => dispatch(addMessage(e.target.value))}
        onKeyDown={sendInput}
      />
    </div>
  )
}

export default InputMessage
