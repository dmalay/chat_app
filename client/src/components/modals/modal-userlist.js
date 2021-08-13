import React, { useState } from "react"
import { useSelector } from "react-redux"

import UserlistForm from "./modal-components.js/userlist-form"
import PopupForDirect from "./popup-DM"

const ModalUserlist = (props) => {
  const { modal, setModal} = props
  const { actualChat, chats } = useSelector((s) => s.chat)
  const { _id, login } = useSelector((s) => s.auth.user)
  const [popup, setPopup] = useState(false)
  const [userForDm, setUserForDm] = useState({})
  const genChat = chats.find((it) => it.name === 'general')
  console.log('popup',  popup)

  const closeModal = (e) => {
    e.stopPropagation()
    if (e.target.classList.contains("modal-close")) {
      return props.click()
    }
  }

  return (
    <div
      className="w-screen h-screen table absolute top-0 right-0 modal-close"
      onClick={closeModal}
    >
      <div
        className="w-72 h-96 top-0 right-0 z-20 absolute
      bg-blue-500 border border-black rounded shadow m-6 mt-12"
      >
        <div className="border border-white flex flex-col h-full relative">
          <div className="text-white m-2 p-1 text-center">User List</div>

          {popup && (
            <PopupForDirect
            setPopup={setPopup}
            popup={popup}
            setModal={setModal}
            modal={modal}
              click={() => setPopup(false)}
              userForDm={userForDm}
              authId={_id}
              authLogin={login}
              actualChatType={actualChat.type}
              actualChatId={actualChat._id}
              genChatId={genChat._id}
            />
          )}

          <div className="mx-5 bg-purple-900 flex-1 border-r border-b">
            {actualChat.subscribers.map((user) => {
              return (
                <UserlistForm
                  key={user._id}
                  user={user}
                  popup={popup}
                  setPopup={setPopup}
                  setUserForDm={setUserForDm}
                  authId={_id}
                />
              )
            })}
          </div>

          <div className="bg-blue-500 p-3 font-light text-white ">
            <p className="modal-close text-center" onClick={closeModal}>
              CLOSE
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalUserlist
