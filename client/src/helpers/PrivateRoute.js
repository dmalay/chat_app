import React from "react"
import { Redirect, Route } from "react-router"
import { useSelector } from "react-redux"

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? (
      <Component {...props} />
    ) : (
    <Redirect to={{pathname: "/signin"}} />
    )
  }
  return <Route {...rest} render={func} />
}
