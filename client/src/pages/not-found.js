import React from "react"
import { useDispatch } from "react-redux"
import { push } from "connected-react-router"

const NotFound = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>404</h1>
      <p>Page Not Found</p>
      <button
        type="button"
        onClick={() => {
          dispatch(push('/'))
        }}
      >
        Back to Main Page
      </button>
    </div>
  )
}

export default NotFound
