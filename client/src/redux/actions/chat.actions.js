import chatService from "../../services/chatService"

import {
  FETCH_CHATS,
  CHANGE_ACTUAL_CHAT,
  JOIN_CHAT,
  QUIT_CHAT,
  CREATE_CHAT,
  SET_ERROR,
  SET_SOCKET,
  RECEIVED_MESSAGE,
  DELETE_PRIVATE_CHAT
} from "../types/chat.types"

export function fetchChats() {
  return (dispatch) => {
    return chatService
      .fetchChats()
      .then((data) => {
        dispatch({
          type: FETCH_CHATS,
          chats: data.chats,
          actualChat: data.actualChat,
        })
      })
      .catch((err) => {
        throw err
      })
  }
}

export function changeActualChat(chatId) {
  return (dispatch, getState) => {
    chatService
      .changeActualChat(chatId)
      .then((data) => {
        const { scrollBottom } = getState().chat
        const newScrollBottom = scrollBottom + 1
        console.log(newScrollBottom)
        dispatch({ type: CHANGE_ACTUAL_CHAT, actualChat: data.actualChat, scrollBottom: newScrollBottom })
      })
      .catch((err) => {
        throw err
      })
  }
}

export function joinChat({ authID, _id }) {
  return (dispatch) => {
    chatService
      .joinChat({ authID, _id })
      .then((data) => {
        dispatch({ type: JOIN_CHAT, chats: data.chats })
      })
      .catch((err) => {
        throw err
      })
  }
}

export function quitChat({ authID, _id }) {
  return (dispatch) => {
    chatService
      .quitChat({ authID, _id })
      .then((data) => {
        dispatch({ type: QUIT_CHAT, chats: data.chats })
      })
      .catch((err) => {
        throw err
      })
  }
}

export function createChat({ name, title, type, idForDm, _id }) {
  return (dispatch, getState) => {
    const { errors } = getState().chat
    chatService
      .createChat({ name, title, type, idForDm, _id })
      .then((data) => {
        dispatch({ type: CREATE_CHAT, chats: data.chats })
        dispatch({
          type: SET_ERROR,
          errors: { ...errors, ...{ createChatError: false } },
        })
      })
      .catch(() => {
        dispatch({
          type: SET_ERROR,
          errors: { ...errors, ...{ createChatError: true } },
        })
      })
  }
}
export function resetError(err) {
  return (dispatch, getState) => {
    const { errors } = getState().chat
    dispatch({ type: SET_ERROR, errors: { ...errors, ...{ [err]: false } } })
  }
}

export function resetAllErrors() {
  return (dispatch, getState) => {
    const { errors } = getState().chat
    Object.keys(errors).forEach((err) => {
      dispatch({
        type: SET_ERROR,
        errors: { ...errors, ...{ [err]: false } },
      })
    })
  }
}

export function setSocket(socket) {
  return (dispatch) => {
    dispatch({ type: SET_SOCKET, socket })
  }
}

export function receivedMessage(message, userID) {
  return (dispatch, getState) => {
    const { actualChat } = getState().chat
    if (actualChat._id === message.chatID) {
      const chatCopy = {
        ...actualChat,
        messages: [...actualChat.messages, ...[message]],
      }

      dispatch({ type: RECEIVED_MESSAGE, message, actualChat: chatCopy })
    }
  }
}

export function deleteChat(chatId) {
  return (dispatch) => {
    chatService
    .deleteChat(chatId)
    .then((data) => {
      dispatch({ type: DELETE_PRIVATE_CHAT, data })
    })
    .catch((err) => {
      throw err
    })
  }
}