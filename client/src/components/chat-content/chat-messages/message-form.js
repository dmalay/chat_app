import React from 'react'

const MessageForm = ({message}) => {
  return (
    <div className="flex item-start mb-4">
      <img src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4"
        alt="avatar"
        className="w-10 h-10 rounded mr-3"
      />
      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="font-bold mr-2 font-sans">username</span>
          <span className="text-gray-400 text-xs font-light">11:46</span>
        </div>
        <p className="text-md text-gray-800 pt-1">
          {message.text} chat definition: to talk someone in a friendly informal way.
          </p>
      </div>
    </div>
  )
}

export default MessageForm
