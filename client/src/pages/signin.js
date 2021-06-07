import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateLoginField, updatePasswordField } from "../redux/reducers/auth"

const SignIn = () => {
  const dispatch = useDispatch()
  const { login, password } = useSelector((s) => s.auth)
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className=" max-w-xs ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
          <h1 className='mx-4 mt-4 mb-10 text-center text-xl font-bold'>Login</h1>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={login}
              onChange={(e) => {
                dispatch(updateLoginField(e.target.value))
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => {
                dispatch(updatePasswordField(e.target.value))
              }}
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="mb-8 flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              // onClick={() => dispatch())}
            >
              Sign In
            </button>
          </div>
          <div className="text-blue-500 hover:underline hover:text-blue-800">
            <Link to="/signup" >
                Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
