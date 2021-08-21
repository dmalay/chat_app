import chatService from "../../services/chatService"
import socketService from "../../socket.io/socketService"

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
  MESSAGE_READ,
  SENDER_TYPING,
  STATUS_ONLINE,
  STATUS_OFFLINE,
  PAGINATED_MESSAGES,
} from "../types/chat.types"

export function fetchChats() {
  return (dispatch) => {
    return chatService
      .fetchChats()
      .then((data) => {
        data.actualChat.messages.reverse()
        return data
      })
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
        data.actualChat.messages.reverse()
        return data
      })
      .then((data) => {
        const { scrollBottom } = getState().chat
        const newScrollBottom = scrollBottom + 1
        console.log(newScrollBottom)
        dispatch({
          type: CHANGE_ACTUAL_CHAT,
          actualChat: data.actualChat,
          scrollBottom: newScrollBottom,
        })
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
    const { errors, socket } = getState().chat
    chatService
      .createChat({ name, title, type, idForDm, _id })
      .then((data) => {
        console.log(data)
        socketService.chatCreated(socket, {chatId: data.chatId, forUserId: idForDm})
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
    const { actualChat, scrollBottom, unreadMessages } = getState().chat
    let newScrollBottom = scrollBottom
    if (actualChat._id === message.chatID) {
      newScrollBottom += 1
      const chatCopy = {
        ...actualChat,
        messages: [...actualChat.messages, ...[message]],
      }
      dispatch({
        type: RECEIVED_MESSAGE,
        message,
        actualChat: chatCopy,
        scrollBottom: newScrollBottom,
        unreadMessages,
      })
    } else {
      dispatch({
        type: RECEIVED_MESSAGE,
        actualChat,
        scrollBottom,
        unreadMessages: { ...unreadMessages, ...{ [message.chatID]: true } },
      })
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
    const { chats } = getState().chat
    chatService
      .deleteChat(chatId)
      .then((data) => {
        const newChats = chats.filter((chat) => chat._id !== chatId)
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

export function paginateMessages(chatId, page) {
  return (dispatch, getState) => {
    chatService.paginateMessages(chatId, page).then((data) => {
      const { messages, pagination, chatId } = data
      const { actualChat, scrollUp } = getState().chat
      if (actualChat._id === chatId && messages?.length) {
        let newScrollUp = scrollUp
        if (messages?.length) {
          messages.reverse()
          newScrollUp += 1
        }
        const chatCopy = {
          ...actualChat,
          pagination,
          messages: [...messages, ...actualChat.messages],
        }
        dispatch({
          type: PAGINATED_MESSAGES,
          actualChat: chatCopy,
          scrollUp: newScrollUp,
        })
      } else {
        dispatch({ type: PAGINATED_MESSAGES, actualChat, scrollUp })
      }
    })
  }
}

export function messageRead(chatId) {
  return (dispatch, getState) => {
    const { unreadMessages } = getState().chat
    dispatch({
      type: MESSAGE_READ,
      unreadMessages: { ...unreadMessages, ...{ [chatId]: false } },
    })
  }
}

export function chatDeleted(chatId) {
  return (dispatch, getState) => {
      const { chats } = getState().chat
      const newChats = chats.filter((chat) => chat._id !== chatId)
      dispatch({ type: DELETE_PRIVATE_CHAT, chats: newChats })
  }
}

export function chatCreated(chat) {
  return (dispatch, getState) => {
    const { chats } = getState().chat
    dispatch({ type: CREATE_CHAT, chats: [...chats, ...[chat]] })
  }
}
