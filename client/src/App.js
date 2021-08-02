import React from "react"
import { Switch, Route } from "react-router-dom"

import { PrivateRoute } from "./helpers/PrivateRoute"
import { AnonymousRoute } from "./helpers/AnonymousRoute"
import Startup from "./helpers/Startup"

import Main from "./pages/main"
import SignIn from "./pages/signin"
import SignUp from "./pages/signup"
import NotFound from "./pages/not-found"

function App() {
  return (
    <div className="App">
      <Startup>
        <Switch>
          <PrivateRoute exact path="/" component={Main} />
          <AnonymousRoute exact path="/signin" component={SignIn} />
          <AnonymousRoute exact path="/signup" component={SignUp} />
          <Route component={() => <NotFound />} />
        </Switch>
      </Startup>
    </div>
  )
}

export default App
