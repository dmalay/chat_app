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

  changeActualChat: (chatId) => {
    return API.get(`/chats/current${chatId}`)
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
    return API.post("/chats/create", data)
      .then(({ data }) => {
        return data
      })
      .catch((err) => {
        throw err
      })
  },

  deleteChat: (chatId) => {
    return API.delete(`/chats/${chatId}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      throw err
    })
  },

  paginateMessages: (chatId, page) => {
    return API.get('/messages', {
      params: { chatId, page }
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      throw err
    })
  }

}

export default chatService
