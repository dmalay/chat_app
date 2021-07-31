import React from "react"
import { Redirect, Route } from "react-router"
import { useSelector } from "react-redux"

export const AnonymousRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? (
        <Redirect to={{pathname: "/signin"}} />
        ) : (
        <Component {...props} />
    )
  }
  return <Route {...rest} render={func} />
}
