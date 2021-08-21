import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createChat,
  deleteChat,
  changeActualChat,
} from "../../redux/actions/chat.actions"
import socketService from "../../socket.io/socketService"

const PopupForDirect = (props) => {
  const {
    userForDm,
    authId,
    authLogin, 
    genChatId,
    setPopup, popup,
    setModal, modal,
    activePvtChats,
    activePvtDMs
  } = props

  const { socket } = useSelector((s) => s.chat)
  const privateChat = activePvtChats.filter((it) => it.subscribers[0]._id === userForDm._id || it.subscribers[1]._id === userForDm._id)
  const dispatch = useDispatch()

  const createPrivateChat = () => {
    dispatch(
      createChat({
        name: "Private Chat",
        title: `Private Chat Between ${userForDm.login} and ${authLogin}`,
        type: "private",
        _id: authId,
        idForDm: userForDm._id,
      })
    )
  }

  const deletePrivateChat = () => {
    dispatch(deleteChat(privateChat[0]._id))
    socketService.chatDeleted(socket, {privateChatId: privateChat[0]._id, forUserId: userForDm._id})

  }

  const changeChatToGeneral = () => {
    dispatch(changeActualChat(genChatId))
  }

  const closeAll = () => {
    return typeof modal === 'undefined'
    ? setPopup(!popup)
    : setModal(!modal)
  }

  return (
    <>
      <div
        className="fixed text-gray-500 overflow-auto bg-indigo-900 bg-opacity-30 
        left-0 right-0 top-0 bottom-0 transform  transition-transform duration-600 "
        onClick={() => closeAll()}
      ></div>
      <div className="absolute bg-white mx-3 my-8 border rounded flex flex-col w-60 z-50 l">
        <div className="items-center">
          <p className="text-l text-center text-purple-900 font-bold py-4">
            {userForDm.login}
          </p>
        </div>

        <div className="text-center p-2 flex-auto justify-center">
          <p className="text-m text-gray-600 px-10">
            {activePvtDMs.includes(userForDm._id)
              ? "Quit private chat with this user?"
              : "Message directly to this user?"}
          </p>
        </div>

        <div
          className="p-3 flex mt-2 text-center flex text-sm tracking-widest
        font-extrabold md:block"
        >
          {activePvtDMs.includes(userForDm._id) ? (
            <p
            className="cursor-pointer bg-white py-2 shadow-sm  border text-green-600 rounded border-gray-400
            hover:shadow-lg hover:bg-gray-100"
            onClick={()=> {
              changeChatToGeneral()
              deletePrivateChat()
              closeAll()
            }}
            >
              YES
            </p>
          ) : (
            <p
              className="cursor-pointer bg-white py-2 shadow-sm  border text-green-600 rounded border-gray-400
                         hover:shadow-lg hover:bg-gray-100"
              onClick={()=> {
                createPrivateChat()
                closeAll()
              }}
            >
              YES
            </p>
          )}
          <p
            className="cursor-pointer mb-2 bg-red-500 border border-red-800 py-2 shadow-sm text-white
            rounded hover:shadow-lg hover:bg-red-600"
            onClick={() => setPopup(!popup)}
          >
            NO
          </p>
        </div>
      </div>
    </>
  )
}

export default PopupForDirect
