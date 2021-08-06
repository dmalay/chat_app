import React, { useState, Fragment } from "react"
import { useSelector } from "react-redux"

import Modal from "../modal/modal"

const channelsBtn = () => {
  const [modal, setModal] = useState(false)

  return (
    <div
      className={`px-4 py-2 mb-2 font-sans cursor-pointer ${
        modal ? "bg-blue-600 text-white" : "hover:bg-blue-600 text-white"
      }`}
      onClick={(e) => {
        setModal(!modal)
      }}
    >
      <p>Channels</p>
      {modal && <Modal click={() => setModal(false)}></Modal>}
    </div>
  )
}

export default channelsBtn
