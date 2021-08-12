import React from "react"
import { useDispatch } from "react-redux"
import { createChat } from "../../redux/actions/chat.actions"

const PopupForDirect = (props) => {
  const { userForDm, authId, authLogin } = props
console.log(userForDm)
  const dispatch = useDispatch()

  const closePopup = (e) => {
    e.stopPropagation()
    console.log(e)
    if (e.target.classList.contains("popup-close")) {
      return props.click()
    }
  }
  const createPrivateChat = () => {
    dispatch(createChat({
      name: "Private Chat",
      title: `Private Chat Between ${userForDm.login} and ${authLogin}`,
      type: "private",
      _id: authId,
      idForDm: userForDm._id
    }))
  }

  return (
    <>
      <div
        className="popup-close fixed text-gray-500 overflow-auto bg-indigo-900 bg-opacity-30 
        left-0 right-0 top-0 bottom-0 transform  transition-transform duration-600 "
        onClick={closePopup}
      ></div>
      <div className="absolute bg-white mx-3 my-8 border rounded flex flex-col w-60 z-50 l">
        <div className="items-center">
          <p className="text-l text-center text-purple-900 font-bold py-4">
            {userForDm.login}
          </p>
        </div>

        <div className="text-center p-2 flex-auto justify-center">
          <p className="text-m text-gray-600 px-10">
            Message directly to this user?
          </p>
        </div>

        <div
          className=" p-3 flex mt-2 text-center flex flex-col text-sm tracking-widest
        font-extrabold md:block"
        >
          <p
            className="popup-close bg-white py-2 shadow-sm  border text-green-600 rounded border-gray-400
          hover:shadow-lg hover:bg-gray-100"
            onClick={closePopup, createPrivateChat}
          >
            YES
          </p>

          <p
            className="popup-close mb-2 bg-red-500 border border-red-800 py-2 shadow-sm text-white
            rounded hover:shadow-lg hover:bg-red-600"
            onClick={closePopup}
          >
            NO
          </p>
        </div>
      </div>
    </>
  )
}

export default PopupForDirect
