import React from 'react'

const InputMessage = () => {
  return (
    <div className="flex m-6 rounded-lg border-2 border-gray-500 overflow-hidden">
      <span className="text-3xl text-gray-500 px-3 py-1 border-r-2 border-gray-500">+</span>
      <input
      type="text"
      placeholder="Message to #general"
      className="w-full px-4"
      />
    </div>
  )
}

export default InputMessage
