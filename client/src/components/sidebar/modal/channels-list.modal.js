import React from "react"
import { useDispatch } from "react-redux"

import { joinChat } from "../../../redux/actions/chat.actions"

const ChannelListModal = ({ userID, chat }) => {
  const dispatch = useDispatch()
  const { name, subscribers, _id } = chat
  const chatActive = subscribers.includes(userID)
  console.log(_id)
  return (
    <div
      className={`text-white font-semibold flex justify-between ${
        chatActive ? "bg-yellow-600" : "hover:bg-indigo-500"
      }`}
      // onClick={() => {
      //   if (false) {
      //     dispatch(changeCurrentChat(_id))
      //   }
      // }}
    >
      <span className="text-gray-300 p-1">#</span>
      <span className="w-full p-1">{name}</span>
      {chatActive ? (
        <button className="w-2/5 py-1 px-6 hover:bg-yellow-600 text-center cursor-pointer"
        >
          QUIT
          </button>
      ) : (
        <div
          className="w-2/5 py-1 px-6 hover:bg-yellow-600 text-center cursor-pointer"
          onClick={() => {
            dispatch(joinChat({ userID, _id }))
          }}
        >
          JOIN
        </div>
      )}
    </div>
  )
}

export default ChannelListModal
