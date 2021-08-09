import React from 'react'

const MessageForm = ({text, userId, time }) => {
  return (
    <div className="flex item-start mb-4">
      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="font-bold mr-2 font-sans">username</span>
          <span className="text-gray-400 text-xs font-light">{time}</span>
        </div>
        <p className="text-md text-gray-800 pt-1">
          {text}
          </p>
      </div>
    </div>
  )
}

export default MessageForm
