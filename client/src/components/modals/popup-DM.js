import React from "react"

const PopupForDirect = (props) => {
  const closeModal = (e) => {
    e.stopPropagation()
    if (e.target.classList.contains("modal-close")) {
      return props.click()
    }
  }

  return (
    <>
      <div
      className="modal-close fixed text-gray-500 overflow-auto bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0"
      onClick={closeModal}
      ></div>
      <div className="absolute bg-white mx-3 my-8 border rounded flex flex-col w-60 z-50">
        <div className="items-center">
          <p className="text-l text-center text-purple-900 font-bold py-4">
            Username
          </p>
        </div>

        <div className="text-center p-2 flex-auto justify-center">
          <p className="text-m text-gray-600 px-10">
            Message directly to this user?
          </p>
        </div>

        <div className="p-3 flex mt-2 text-center flex flex-col text-sm tracking-widest font-extrabold md:block">
          <p className=" bg-white py-2 shadow-sm  border text-green-600 rounded border-gray-400 hover:shadow-lg hover:bg-gray-100">
            YES
          </p>

          <p
          className="modal-close mb-2 bg-red-500 border border-red-800 py-2 shadow-sm text-white rounded hover:shadow-lg hover:bg-red-600"
          onClick={closeModal}
          >
            NO
          </p>
        </div>
      </div>
    </>
  )
}

export default PopupForDirect
