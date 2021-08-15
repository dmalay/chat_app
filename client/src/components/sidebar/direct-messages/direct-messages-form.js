import React from "react"
import { useDispatch } from "react-redux"

const DirectMessagesForm = ({ chat, authId, isChatCurrent, setNewChat }) => {
  const dispatch = useDispatch()
  const userToDm = chat.subscribers.find((it) => it._id !== authId)

  return (
    <div
      className={`flex items-center py-1 px-6 ${
        isChatCurrent
          ? "tracking-wider bg-yellow-600 hover:bg-yellow-600"
          : "hover:bg-indigo-500 cursor-pointer"
      }`}
      onClick={()=> {
        if (!isChatCurrent) {
          setNewChat.forEach(element => {
            dispatch(element(chat._id))
          })
        }
      }}
    >
      <span className="bg-green-500 block w-2 h-2 mr-2 rounded-full"></span>
      <span className="text-purple-100">{userToDm.login}</span>
    </div>
  )
}

export default DirectMessagesForm
