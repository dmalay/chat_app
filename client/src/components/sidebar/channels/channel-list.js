import React from "react"
import { useDispatch } from "react-redux"

const ChannelList = ({ name, _id, isChatCurrent, setNewChat }) => {
  const dispatch = useDispatch()

  return (
    <div
      className={`text-white font-semibold py-1 px-6 ${
        isChatCurrent
          ? "tracking-wider bg-yellow-600 hover:bg-yellow-600"
          : "hover:bg-indigo-500 cursor-pointer"
      }`}
      onClick={() => {
        if (!isChatCurrent) {
          setNewChat.forEach(element => {
            dispatch(element(_id))
          })
        }
      }}
    >
      <span className="text-gray-300 pr-1">#</span>
      <span className="">{name}</span>
    </div>
  )
}

export default ChannelList
