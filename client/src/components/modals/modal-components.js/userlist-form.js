import React from "react"

const UserlistForm = (props) => {
  const { user, authId, popup } = props
  console.log(user, authId )
  return (
    <div>
      <button
        className="flex w-full items-center px-4 my-1 py-1 hover:bg-indigo-500
        appearance-none focus:outline-none"
        onClick={() => {
          if(user._id !== authId) { 
            props.setPopup(!popup)
            props.setUserForDm(user)
          }
        }}
      >
        <span className="text-purple-100">{user.login}</span>
        <i className="text-gray-300 text-sm mx-2 flex flex-1 items-start">
        {user._id === authId ? '(me)' : null}
          
        </i>
        <span className="bg-green-300 block w-2 h-2 mr-4 rounded-full"></span>
      </button>
    </div>
  )
}

export default UserlistForm
