import React from "react"

const ChannelList = ({ name }) => {
  return (
    <div
    className="text-white font-semibold py-1 px-4 hover:bg-indigo-500"
    >
      <span className="text-gray-300 pr-1">#</span>
      <span className="">{name}</span>
    </div>
  )
}

export default ChannelList
