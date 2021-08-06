import API from "./API"

const chatService = {
  fetchChats: () => {
    return API.get("/chats")
      .then(({ data }) => {
        return data
      })
      .catch((err) => {
        throw err
      })
  },

  joinChat: (data) => {
    return API.post("/chats/join", data)
      .then(({ data }) => {
        return data
      })
      .catch((err) => {
        throw err
      })
  },

  quitChat: (data) => {
    return API.post("/chats/quit", data)
      .then(({ data }) => {
        return data
      })
      .catch((err) => {
        throw err
      })
  },

  createChat: (data) => {
    console.log(data)
    return API.post("/chats/create", data)
      .then(({ data }) => {
        return data
      })
      .catch((err) => {
        throw err
      })
  },
}

export default chatService
