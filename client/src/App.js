import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from './components/main'
import SignIn from './components/signin'
import SignUp from './components/signup'

function App() {
  return (
    <div className="App">
       <Switch>
        <Route exact path="/" component={() => <Main />} />
        <Route exact path="/signin" component={() => <SignIn />} />
        <Route exact path="/signup" component={() => <SignUp />} />
      </Switch>
    </div>
  )
}

export default App
