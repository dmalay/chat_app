import React from "react"

import UserlistBtn from './userlist-btn'

const Topbar = ({ user, currentChat }) => {
  return (
    <div className="flex justify-between items-center border-b border-black px-6 py-2 bg-white relative">
      <div className="flex flex-col">
        <h3 className="text-gray-800 text-md mb-1 font-extrabold">
          #{typeof currentChat !== "undefined" ? currentChat.name : ""}
        </h3>
        <div className="text-gray-600 font-light text-sm">
          {typeof currentChat !== "undefined" ? currentChat.title : ""}
        </div>
      </div>
      <UserlistBtn />
    </div>
  )
}

export default Topbar
