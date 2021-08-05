import React from "react"
import { useDispatch } from "react-redux"


const ChannelListModal = ({ name, subscribers, userID }) => {
  const dispatch = useDispatch()
console.log(subscribers, userID)
const chatActive = subscribers.includes(userID)
  return (
    <div
      className={`text-white font-semibold flex justify-between ${
        chatActive
          ? "bg-yellow-600"
          : "hover:bg-indigo-500"
      }`}
      // onClick={() => {
      //   if (false) {
      //     dispatch(changeCurrentChat(_id))
      //   }
      // }}
    >
      <span className="text-gray-300 pr-1">#</span>
      <span className="w-full">{name}</span>
      {chatActive
      ? <button className="w-1/4 mx-3">QUIT</button>
    : <div className="w-2/5 py-1 px-6 hover:bg-yellow-600 text-center cursor-pointer"
    onClick={()=> {}}
    >JOIN</div>
    }
    </div>
  )
}

export default ChannelListModal
