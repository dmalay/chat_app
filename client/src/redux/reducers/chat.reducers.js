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

const initialState = {
  message: {},
  scrollBottom: 0,
  chats: [],
  actualChat: {},
  errors: {},
  socket: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATS: {
      const { chats, actualChat } = action
      return {
        ...state,
        chats,
        actualChat,
      }
    }
    case CHANGE_ACTUAL_CHAT: {
      const { actualChat, scrollBottom } = action
      return {
        ...state,
        actualChat,
        scrollBottom
      }
    }
    case JOIN_CHAT: {
      const { chats } = action
      return {
        ...state,
        chats,
      }
    }
    case QUIT_CHAT: {
      const { chats } = action
      return {
        ...state,
        chats,
      }
    }
    case CREATE_CHAT: {
      const { chats } = action
      return {
        ...state,
        chats,
      }
    }
    case SET_ERROR: {
      const { errors } = action
      return {
        ...state,
        errors,
      }
    }
    case SET_SOCKET: {
      const { socket } = action
      return {
        ...state,
        socket,
      }
    }
    case RECEIVED_MESSAGE: {
      const { message, actualChat } = action
      return {
        ...state,
        message,
        actualChat,
      }
    }
    case DELETE_PRIVATE_CHAT: {
      const { chats } = action
      return {
        ...state,
        chats
      }
    }

    default:
      return state
  }
}
