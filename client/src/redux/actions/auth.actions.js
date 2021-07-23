import {
  UPDATE_LOGIN,
  UPDATE_PASSWORD,
  SIGN_IN,
  REGISTER,
  SET_ERROR,
} from "../types/auth.types"

export function updateLoginField(login) {
  return { type: UPDATE_LOGIN, login }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function signIn() {
  return (dispatch, getState) => {
    const store = getState()
    const { login, password } = store.auth
    console.log(JSON.stringify({login, password}))
    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: SIGN_IN, token: data.token, user: data.user })
      })
      .catch(() => {
        dispatch({
          type: SET_ERROR,
          error: "Authefication failed, incorrect login or password",
        })
      })
  }
}

export function register() {
  return (dispatch, getState) => {
    const store = getState()
    const { login, password } = store.auth
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password })
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: REGISTER, token: data.token, user: data.user })
      })
      .catch(() => {
        dispatch({
          type: SET_ERROR,
          error: "Registration failed, incorrect login or password"
        })
      })
  }
}
