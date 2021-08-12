import React from 'react'

const DirectMessagesForm = ({chat}) => {
  return (
    <div className="flex items-center px-4 mb-6">
      <span className="bg-green-500 block w-2 h-2 mr-2 rounded-full"></span>
      <span className="text-purple-100">John Bull</span>
      <i className="text-gray-300 text-sm mx-2">(me)</i>
    </div>
  )
}

export default DirectMessagesForm
