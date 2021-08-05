import { ADD_MESSAGE, SUBMIT_MESSAGE, FETCH_CHATS, JOIN_CHAT } from "../types/chat.types"

const initialState = {
  message: "",
  messages: [],
  chats: [],
  currentChat: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { message } = action
      return {
        ...state,
        message
      }
    }
    case SUBMIT_MESSAGE: {
      const { messages } = action
      return {
        ...state,
        messages
      }
    }
    case FETCH_CHATS: {
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
