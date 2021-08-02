import axios from "axios"
import { store } from "../redux/store"
import { logout } from "../redux/actions/auth.actions"

const API = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})

API.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
        console.log(err.response.data.message)
        if (err.response.status === 500 && err.response.data.message === "jwt expired") {
            store.dispatch(logout())
            throw err
        }
    }
)

export default API
