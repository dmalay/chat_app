/* eslint-disable import/no-anonymous-default-export */
const UPDATE_LOGIN = "UPDATE_LOGIN"
const UPDATE_PASSWORD = "UPDATE_PASSWORD"

const initialState = {
  login: "",
  password: "",
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
    default:
      return state
  }
}

export function updateLoginField(login) {
  return { type: UPDATE_LOGIN, login }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}
