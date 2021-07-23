import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from './pages/main'
import SignIn from './pages/signin'
import SignUp from './pages/signup'

function App() {
  return (
    <div className="App">
       <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </div>
  )
}

export default App
