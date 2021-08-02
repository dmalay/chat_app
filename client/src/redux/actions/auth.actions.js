import authService from "../../services/authService"
import { history } from "../store"

import {
  UPDATE_LOGIN,
  UPDATE_PASSWORD,
  SIGN_IN,
  REGISTER,
  SET_ERROR,
  LOGOUT,
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

    authService
      .login({ login, password })
      .then((data) => {
        dispatch({ type: SIGN_IN, token: data.token, user: data.user })
        history.push("/")
      })
      .catch(() => {
        dispatch({
          type: SET_ERROR,
          error: "Authefication failed, incorrect login or password",
        })
      })
  }
}

export function loginWithToken() {
  return (dispatch) => {
    authService.loginWithToken()
    .then((data) => {
      dispatch({ type: SIGN_IN, token: data.token, user: data.user })
      history.push("/")
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

    authService
      .register({ login, password })
      .then((data) => {
        dispatch({ type: REGISTER, token: data.token, user: data.user })
        history.push("/")
      })
      .catch(() => {
        dispatch({
          type: SET_ERROR,
          error: "Registration failed, incorrect login or password",
        })
      })
  }
}

export function logout() {
  return (dispatch) => {
    authService.logout()
    dispatch({ type: LOGOUT })
  }
}
