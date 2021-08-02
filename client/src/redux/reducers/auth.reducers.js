import {
  UPDATE_LOGIN,
  UPDATE_PASSWORD,
  SIGN_IN,
  SET_ERROR,
  REGISTER,
  LOGOUT,
} from "../types/auth.types"

const initialState = {
  login: "",
  password: "",
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
      const { user, token } = action
      return {
        ...state,
        user,
        token,
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
        isLogged: false,
      }
    }
    default:
      return state
  }
}
