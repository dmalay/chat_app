import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"

import MessageForm from "./message-form"
import localtimeConverter from "../../../helpers/localtimeConverter"
import PopupForDirect from "../../modals/popup-DM"
import { findActivePvtChats, findActivePvtDMs } from "../../../helpers/helpers"

const ChatMessages = ({ actualChat, currentChat, user }) => {
  const { messages } = actualChat
  const { scrollBottom, chats, online } = useSelector((s) => s.chat)

  const chatBox = useRef()
  const [popup, setPopup] = useState(false)
  const [userForDm, setUserForDm] = useState({})
  const [loading, setLoading] = useState(false)

  const genChat = chats.find((it) => it.name === "general")

  useEffect(() => {
    setTimeout(() => {
      scrollManual(chatBox.current.scrollHeight)
    }, 100)
  }, [scrollBottom])

  const scrollManual = (value) => {
    chatBox.current.scrollTop = value
  }


  const handleInfiniteScroll = (e) => {
    if (e.target.scrollTop === 0) {
      setLoading(true)
      
    }
  }

  return (
    <>
      <div
      onScroll={handleInfiniteScroll}
        ref={chatBox}
        className="px-6 py-4 flex-1 flex-auto overflow-scroll-x overflow-y-auto bg-indigo-100"
      >
        {popup && (
          <PopupForDirect
            setPopup={setPopup}
            popup={popup}
            userForDm={userForDm}
            authId={user._id}
            authLogin={user.login}
            actualChatType={actualChat.type}
            actualChatId={actualChat._id}
            genChatId={genChat._id}
            activePvtChats={findActivePvtChats(chats, user._id)}
            activePvtDMs={findActivePvtDMs(chats, user._id)}
          />
        )}

        {actualChat?._id && currentChat?._id === actualChat._id
          ? messages.map((it) => {
              return (
                <MessageForm
                  key={it._id}
                  text={it.text}
                  name={it.name}
                  fromUser={it.fromUser}
                  time={localtimeConverter(it.createdAt)}
                  isUserCurrent={it.name === user.login}
                  popup={popup}
                  setPopup={setPopup}
                  setUserForDm={setUserForDm}
                  isOnline={online.includes(it.fromUser)}
                />
              )
            })
          : null}
      </div>
    </>
  )
}

export default ChatMessages
