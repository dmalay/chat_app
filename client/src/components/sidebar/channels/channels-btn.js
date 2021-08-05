import React, { useState } from "react"

import Modal from "../modal/modal"

const channelsBtn = () => {
  const [modal, setModal] = useState(false)
  // const [modalFolder, setModalFolder] = useState(false)

  console.log(modal, "<modal")

  return (
    <div
      className={`px-4 py-2 mb-2 font-sans cursor-pointer ${
        modal ? "bg-blue-600 text-white" : "hover:bg-blue-600 text-white"
      }`}
      onClick={(e) => {
        setModal(!modal)
      }}
    >
      <span className="">Channels</span>
      {modal && (
        <Modal click={() => setModal(false)}>
          {/* {modal} */}
          <div></div>
        </Modal>
      )}
    </div>
  )
}

export default channelsBtn
