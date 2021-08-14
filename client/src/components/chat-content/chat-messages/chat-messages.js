import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"

import MessageForm from "./message-form"
import localtimeConverter from "../../../helpers/localtimeConverter"
import PopupForDirect from "../../modals/popup-DM"

const ChatMessages = ({ actualChat, currentChat, user }) => {
  const { messages } = actualChat
  const { scrollBottom, chats } = useSelector((s) => s.chat)

  const chatBox = useRef()
  const [popup, setPopup] = useState(false)
  const [userForDm, setUserForDm] = useState({})
  const genChat = chats.find((it) => it.name === "general")

  useEffect(() => {
    setTimeout(() => {
      scrollManual(chatBox.current.scrollHeight)
    }, 100)
  }, [scrollBottom])

  const scrollManual = (value) => {
    chatBox.current.scrollTop = value
  }

  const activePvtChats = chats.filter((it) => {
    const subscribed = Boolean(it.subscribers.find((it) => it._id === user._id))
    return it.type === "private" && subscribed
  })

  const activePvtDMs = chats.reduce((acc, rec) => {
    if (rec.type === "private") {
      if (rec.subscribers[0]._id === user._id) {
        return [...acc, rec.subscribers[1]._id]
      }
      if (rec.subscribers[1]._id === user._id) {
        return [...acc, rec.subscribers[0]._id]
      }
      return acc
    }
    return acc
  }, [])

  console.log(userForDm)
  return (
    <>
      <div
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
            activePvtChats={activePvtChats}
            activePvtDMs={activePvtDMs}
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
                />
              )
            })
          : null}
      </div>
    </>
  )
}

export default ChatMessages
