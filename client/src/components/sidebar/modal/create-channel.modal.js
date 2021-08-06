import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { createChat } from "../../../redux/actions/chat.actions"

const CreateChannel = () => {
  const { _id } = useSelector((s) => s.auth.user)
  const dispatch = useDispatch()
  const [name, setName] = useState()
  const [title, setTitle] = useState()

  return (
    <div className="h-full text-m font-light flex flex-col  m-2">
      <div className="flex flex-col p-4">
        <input
          className="appearacne-none border w-auto mb-4 p-2 text-gray-700 leading-tight 
                    focus:outline-none"
          type="text"
          placeholder="type channel name"
          autoComplete="off"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <textarea
          className="appearance-none focus:outline-none resize-none overflow-y-auto
                    text-gray-700 w-auto py-4 px-1 leading-tight"
          type="text"
          placeholder="type description"
          autoComplete="off"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <span className="text-sm  my-1  mx-2 font-light italic text-center text-yellow-200">
          * Sorry, This Channel Already Exists
        </span>
        <button
          className="text-center focus:outline-none my-3"
          onClick={() => {
            dispatch(createChat({ name, title, _id }))
          }}
        >
          CREATE
        </button>
      </div>
    </div>
  )
}

export default CreateChannel
