import React, { useState } from "react"
import PopupForDirect from "../popup-DM"

const UserlistForm = (props) => {
  console.log(props)
  return (
    <div>
      <button
        className="flex w-full items-center px-4 my-1 py-1 hover:bg-indigo-500
        appearance-none focus:outline-none"
        onClick={() => {

          props.setPopup(true)
          props.setUserForDm(props.user)
        }}
      >
        <span className="text-purple-100">subscriber</span>
        <i className="text-gray-300 text-sm mx-2 flex flex-1 items-start">
          (me)
        </i>
        <span className="bg-green-300 block w-2 h-2 mr-4 rounded-full"></span>
      </button>
    </div>
  )
}

export default UserlistForm
