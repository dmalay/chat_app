import React, { useState } from "react"
import { useSelector } from "react-redux"

import ChannelListModal from "./modal-components.js/channel-list.modal"
import CreateChannel from "./modal-components.js/create-channel.modal"

const Modal = (props) => {
  const [folder, setFolder] = useState(false)
  const { chats } = useSelector((s) => s.chat)
  const { _id } = useSelector((s) => s.auth.user)

  const closeModal = (e) => {
    e.stopPropagation()
    if (e.target.classList.contains("modal-close")) {
      return props.click.forEach((element) => {
        element()
      })
    }
  }

  return (
    <div
      className="modal-close absolute w-screen h-screen top-0 left-0 flex justify-left z-10"
      onClick={closeModal}
    >
      <div className="modal-close w-1/6 h-screen"></div>
      <div className="mt-16 h-96 w-72 ">
        <div className="m-2 w-full h-full border border-black bg-blue-500 flex flex-col justify-between">
          <div className="w-full bg-blue-800 font-light text-m flex items-center text-center justify-between border border-b-0">
            <span
              className={`w-1/2 h-full p-3 flex items-center justify-center ${
                folder
                  ? "font-light border-b"
                  : "bg-blue-500 border-r rounded-tr-xl border-b-blue-900"
              }`}
              onClick={() => setFolder(false)}
            >
              channels
            </span>
            <span
              className={`w-1/2 h-full p-3 flex items-center justify-center ${
                folder
                  ? "bg-blue-500 border-l rounded-tl-xl border-b-blue-900"
                  : "font-light border-b"
              }`}
              onClick={() => setFolder(true)}
            >
              create new
            </span>
          </div>
          <div className="flex flex-1 px-4 pt-4 border-l border-r cursor-default">
            <div className=" w-full bg-purple-900 border-r border-b overflow-y-auto flex flex-col">
              {!folder ? (
                chats
                  .sort(
                    (a, b) => {
                      const b_chat = Boolean(b.subscribers.find(it => it._id == _id))
                      const a_chat = Boolean(a.subscribers.find(it => it._id == _id))
                      return b_chat - a_chat
                    }
                  )
                  .map((it) => {
                    if (it.name !== "general" && it.type === 'public') {
                      return (
                        <ChannelListModal key={it._id} authID={_id} chat={it} />
                      )
                    }
                  })
              ) : (
                <CreateChannel />
              )}
            </div>
          </div>
          <div className="w-full bg-blue-500 p-2 font-light flex item-center justify-center border-b border-l border-r">
            <p className="modal-close text-center" onClick={closeModal}>
              CLOSE
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
