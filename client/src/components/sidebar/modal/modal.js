import React, { useState } from "react"

const Modal = (props) => {
  // const { setFolder } = props
  const [folder, setFolder] = useState(false)
  console.log(">", folder)
  const closeModal = (e) => {
    e.stopPropagation()
    if (e.target.classList.contains("modal-close")) {
      return props.click()
    }
  }

  return (
    <div
      className="modal-close absolute w-screen h-screen top-0 left-0 flex justify-left z-10"
      onClick={closeModal}
    >
      <div className="w-1/6 h-screen"></div>
      <div className="w-1/4 mt-16 mr-auto h-1/2">
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
                  ?  "bg-blue-500 border-l rounded-tl-xl border-b-blue-900"
                  : "font-light border-b"
                  }`}
              onClick={() => setFolder(true)}
            >
              create new
            </span>
          </div>
          <div className="h-full px-4 pt-4 border-l border-r">
            <div className=" h-full w-full bg-purple-900 border-r border-b">
              list
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
