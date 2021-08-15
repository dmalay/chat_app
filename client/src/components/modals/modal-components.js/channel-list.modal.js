import React from "react"
import { useDispatch } from "react-redux"

import { joinChat, quitChat } from "../../../redux/actions/chat.actions"

const ChannelListModal = ({ authID, chat }) => {
  const dispatch = useDispatch()
  const { name, subscribers, _id } = chat
  const chatActive = subscribers.find((id) => id._id === authID)

  return (
    <div
      className={`text-white font-semibold flex justify-between hover:bg-indigo-500 ${
        chatActive ? "bg-yellow-600" : null
      }`}
    >
      <span className="text-gray-300 p-1">#</span>
      <span className="w-full p-1">{name}</span>
      {chatActive ? (
        <div
          className="w-2/5 py-1 px-6 hover:bg-purple-900 text-center cursor-pointer"
          onClick={() => {
            dispatch(quitChat({ authID, _id }))
          }}
        >
          QUIT
        </div>
      ) : (
        <div
          className="w-2/5 py-1 px-6 hover:bg-yellow-600 text-center cursor-pointer"
          onClick={() => {
            dispatch(joinChat({ authID, _id }))
          }}
        >
          JOIN
        </div>
      )}
    </div>
  )
}

export default ChannelListModal
