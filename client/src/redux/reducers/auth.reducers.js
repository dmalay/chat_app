import {
  UPDATE_LOGIN,
  UPDATE_PASSWORD,
  SIGN_IN,
  SET_ERROR,
  REGISTER,
  LOGOUT,
  CHANGE_CHAT
} from "../types/auth.types"

const initialState = {
  login: "",
  password: "",
  currentChat: {},
  error: "",
  isLoggedIn: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN: {
      const { login } = action
      return {
        ...state,
        login,
      }
    }
    case UPDATE_PASSWORD: {
      const { password } = action
      return {
        ...state,
        password,
      }
    }
    case SIGN_IN: {
      const { user, token, currentChat } = action
      return {
        ...state,
        user,
        token,
        currentChat,
        password: "",
        isLoggedIn: true,
      }
    }
    case REGISTER: {
      const { user, token } = action
      return {
        ...state,
        user,
        token,
        password: "",
        isLoggedIn: true,
      }
    }
    case SET_ERROR: {
      const { error } = action
      return {
        ...state,
        error,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        user: {},
        token: "",
        isLoggedIn: false,
      }
    }
    case CHANGE_CHAT: {
      const { user } = action
      return {
        ...state,
       user
      }
    }
    default:
      return state
  }
}
