import React, { useState, Fragment } from "react"
import { useDispatch } from "react-redux"

import Modal from "../../modals/modal"
import { resetAllErrors } from "../../../redux/actions/chat.actions"

const channelsBtn = () => {
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()

  return (
    <div
      className={`px-4 py-2 mb-2 font-sans hover:text-white cursor-pointer ${
        modal ? "bg-blue-600 text-white" : "hover:bg-blue-600"
      }`}
      onClick={(e) => {
        setModal(!modal)
      }}
    >
      <p>Channels</p>
      {modal && <Modal click={[() => setModal(false), () => dispatch(resetAllErrors())]}></Modal>}
    </div>
  )
}

export default channelsBtn
