import React from 'react'

const Topbar = () => {
  return (
    <div className="flex items-center border-b px-6 py-2">
      <div className="flex flex-col">
        <h3 className="text-gray-800 text-md mb-1 font-extrabold">#general</h3>
        <div className="text-gray-600 font-thin text-sm">
          chat description here
        </div>
      </div>
    </div>
  )
}

export default Topbar
