import chatService from "../../services/chatService"

import { ADD_MESSAGE, SUBMIT_MESSAGE, FETCH_CHATS } from "../types/chat.types"

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
    dispatch({ type: SUBMIT_MESSAGE, messages: [...messages, newMessage]})
  }
}

export function fetchChats() {
  return (dispatch) => {
    chatService.fetchChats()
    .then((data) => {
      dispatch({ type: FETCH_CHATS, chats: data })
    })
    .catch((err) => {
      throw err
    })
  }
}
