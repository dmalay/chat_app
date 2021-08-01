import React from "react"

const Topbar = () => {
  return (
    <div className="flex items-center border-b px-6 py-2">
      <div className="flex flex-col">
        <h3 className="text-gray-800 text-md mb-1 font-extrabold">#general</h3>
        <div className="text-gray-500 font-thin text-sm">
          text name of chat
        </div>
      </div>
      {/* <div>
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-500 rounded-lg p-2"
        />
      </div> */}
    </div>
  )
}

export default Topbar
