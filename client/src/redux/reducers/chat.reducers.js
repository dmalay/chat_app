import {
  ADD_MESSAGE,
  SUBMIT_MESSAGE,
  FETCH_CHATS,
  JOIN_CHAT,
  QUIT_CHAT,
  CREATE_CHAT,
  SET_ERROR,
} from "../types/chat.types"

const initialState = {
  message: "",
  messages: [],
  chats: [],
  errors: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { message } = action
      return {
        ...state,
        message,
      }
    }
    case SUBMIT_MESSAGE: {
      const { messages } = action
      return {
        ...state,
        messages,
      }
    }
    case FETCH_CHATS: {
      const { chats } = action
      return {
        ...state,
        chats,
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
        errors
      }
    }

    default:
      return state
  }
}
