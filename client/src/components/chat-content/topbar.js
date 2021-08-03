import React from "react"
import { useSelector } from "react-redux"

const Topbar = () => {
  const { title, name } = useSelector((s) => s.auth.currentChat)
  return (
    <div className="flex items-center border-b px-6 py-2">
      <div className="flex flex-col">
        <h3 className="text-gray-800 text-md mb-1 font-extrabold">#{name}</h3>
        <div className="text-gray-600 font-thin text-sm">{title}</div>
      </div>
    </div>
  )
}

export default Topbar
