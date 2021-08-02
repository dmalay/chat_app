import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from './auth.reducers'
import chat from './chat.reducers'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    chat
  })

export default createRootReducer
