import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const initialState = {}
export const history = createBrowserHistory()

const middlewares = [thunk, routerMiddleware(history)]

const rootReducerWithHistory = rootReducer(history)
const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnhancers = composeFunc(applyMiddleware(...middlewares))

export const store = createStore(
  rootReducerWithHistory,
  initialState,
  composedEnhancers
)
