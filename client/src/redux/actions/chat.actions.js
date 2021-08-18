import chatService from "../../services/chatService"

import {
  FETCH_CHATS,
  CHANGE_ACTUAL_CHAT,
  JOIN_CHAT,
  QUIT_CHAT,
  CREATE_CHAT,
  SET_ERROR,
  DELETE_PRIVATE_CHAT,
  SET_SOCKET,
  RESET_SOCKET,
  RECEIVED_MESSAGE,
  SENDER_TYPING,
  STATUS_ONLINE,
  STATUS_OFFLINE,
  PAGINATED_MESSAGES
} from "../types/chat.types"

export function fetchChats() {
  return (dispatch) => {
    return chatService
      .fetchChats()
      .then((data) => {
        // data.chats.forEach((chat)=> {
        //   chat.subscribers.forEach((it) => { 
        //     it.status = "offline"
        //   })
        // })
        
        // data.actualChat.subscribers.forEach((it) => {
        //   it.status = "offline"
        // })

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

export function resetSocket() {
  return (dispatch) => {
    dispatch({ type: RESET_SOCKET })
  }
}

export function receivedMessage(message, userID) {
  return (dispatch, getState) => {
    const { actualChat, scrollBottom } = getState().chat
    let newScrollBottom = scrollBottom
    if (actualChat._id === message.chatID) {
      newScrollBottom += 1
      const chatCopy = {
        ...actualChat,
        messages: [...actualChat.messages, ...[message]],
      }

      dispatch({ type: RECEIVED_MESSAGE, message, actualChat: chatCopy, scrollBottom: newScrollBottom })
    }
  }
}

export function senderTyping(sender) {
  return (dispatch) => {
    dispatch({ type: SENDER_TYPING, sender })
  }
}

export function deleteChat(chatId) {
  return (dispatch, getState) => {
    const { chats } =getState().chat  
    chatService
    .deleteChat(chatId)
    .then((data) => {
      const newChats = chats.filter(chat => chat._id !== chatId)
      dispatch({ type: DELETE_PRIVATE_CHAT, chats: newChats })
    })
    .catch((err) => {
      throw err
    })
  }
}

export function setOnline(users) {
  return (dispatch) => {
    dispatch({ type: STATUS_ONLINE, online: users })
  }
}

export function setOffline(userId) {
  return (dispatch, getState) => {
    const { online } = getState().chat
    const newList = online.filter((id) => id !== userId)
    dispatch({ type: STATUS_OFFLINE, online: newList })
  }
}

export function paginateMessages (data) {
  return (dispatch, getState) => {
    chatService
    .paginateMessages(data)
    .then((data) => {
      console.log(data)
      const { actualChat } = getState().chat
      const newChat = actualChat

      dispatch({ type: PAGINATED_MESSAGES, messages, actualChat: newChat})
    })
  }
}
