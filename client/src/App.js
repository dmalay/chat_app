import React from 'react'
import { Switch } from 'react-router-dom'

import { PrivateRoute } from './helpers/PrivateRoute'
import { AnonymousRoute } from './helpers/AnonymousRoute'
import Main from './pages/main'
import SignIn from './pages/signin'
import SignUp from './pages/signup'

function App() {

  return (
    <div className="App">
       <Switch>
        <PrivateRoute exact path="/" component={Main} />
        <AnonymousRoute exact path="/signin" component={SignIn} />
        <AnonymousRoute exact path="/signup" component={SignUp} />
      </Switch>
    </div>
  )
}

export default App
    