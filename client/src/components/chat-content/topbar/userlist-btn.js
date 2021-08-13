import React, { useState } from "react"

import ModalUserlist from "../../modals/modal-userlist"

const UserListBtn = () => {
  const [modal, setModal] = useState(false)

  return (
    <div
      className="flex justify-between my-4 px-6 cursor-pointer"
      onClick={() => {
        setModal(!modal)
      }}
    >
      <svg
        className="h-8 w-8 mx-2 transition duration-500 ease-in-out transform hover:scale-125"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
      <span className="text-2xl mx-2">1</span>
      {modal && (
        <ModalUserlist
          click={() => setModal(false)}
          modal={setModal}
          setModal={setModal}
        />
      )}
    </div>
  )
}

export default UserListBtn
