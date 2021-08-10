import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"

import MessageForm from "./message-form"
import localtimeConverter from "../../../helpers/localtimeConverter"

const ChatMessages = ({ actualChat, currentChat, user }) => {
  const { messages } = actualChat
  const { scrollBottom } = useSelector((s) => s.chat)
  const chatBox = useRef()

  useEffect(() => {
    setTimeout(() => {
      scrollManual(chatBox.current.scrollHeight)
    },100)
  },[scrollBottom])

  const scrollManual = (value) => {
    chatBox.current.scrollTop = value
  }

  return (
    <>
      <div
      ref={chatBox}
      className="px-6 py-4 flex-1 flex-auto overflow-scroll-x overflow-y-auto bg-indigo-100"
      >
        {actualChat?._id && currentChat?._id === actualChat._id
          ? messages.map((it) => {
              return (
                <MessageForm
                  key={it._id}
                  text={it.text}
                  name={it.name}
                  time={localtimeConverter(it.createdAt)}
                  isUserCurrent={it.name === user}
                />
              )
            })
          : null}
      </div>
    </>
  )
}

export default ChatMessages
