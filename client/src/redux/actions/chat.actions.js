import chatService from "../../services/chatService"

import {
  ADD_MESSAGE,
  SUBMIT_MESSAGE,
  FETCH_CHATS,
  JOIN_CHAT,
} from "../types/chat.types"

export function addMessage(message) {
  return (dispatch) => {
    dispatch({ type: ADD_MESSAGE, message })
  }
}

export function submitMessage(text) {
  return (dispatch, getState) => {
    const store = getState()
    const { messages } = store.chat
    const newMessage = {
      time: +new Date(),
      text,
    }
    dispatch({ type: SUBMIT_MESSAGE, messages: [...messages, newMessage] })
  }
}

export function fetchChats() {
  return (dispatch) => {
    chatService
      .fetchChats()
      .then((data) => {
        dispatch({ type: FETCH_CHATS, chats: data })
      })
      .catch((err) => {
        throw err
      })
  }
}

export function joinChat({ userID, _id }) {
  return (dispatch, useState) => {
    chatService
      .joinChat({ userID, _id })
      .then((data) => {
        console.log(data)
        dispatch({ type: JOIN_CHAT, chats: data.chats })
      })
      .catch((err) => {
        throw err
      })
  }
}
