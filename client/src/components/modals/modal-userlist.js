import React, { useState } from "react"
import { useSelector } from "react-redux"

import UserlistForm from "./modal-components.js/userlist-form"
import PopupForDirect from "./popup-DM"

const ModalUserlist = (props) => {
  const { actualChat } = useSelector((s) => s.chat)
  const [popup, setPopup] = useState(false)
  const [userForDm, setUserForDm] = useState({})
  console.log(popup, userForDm)

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
          
          {popup && <PopupForDirect click={() => setPopup(false)}/>}


          <div className="mx-5 bg-purple-900 flex-1 border-r border-b">
            {actualChat.subscribers.map((user, index) => {
              return <UserlistForm key={index} user={user} setPopup={setPopup} setUserForDm={setUserForDm}/>
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
