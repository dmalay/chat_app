import React from "react"

const Topbar = ({ currentChat }) => {
  return (
    <div className="flex items-center border-b px-6 py-2">
      <div className="flex flex-col">
        <h3 className="text-gray-800 text-md mb-1 font-extrabold">
          #{typeof currentChat !== "undefined" ? currentChat.name : ''}
        </h3>
        <div className="text-gray-600 font-light text-sm">
          {typeof currentChat !== "undefined" ? currentChat.title : ''}
        </div>
      </div>
    </div>
  )
}

export default Topbar
