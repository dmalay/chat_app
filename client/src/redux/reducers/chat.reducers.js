import { ADD_MESSAGE, SUBMIT_MESSAGE } from "../types/chat.types"

const initialState = {
  message: "",
  messages: []
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
    default:
      return state
  }
}
