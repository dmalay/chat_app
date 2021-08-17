export let users = {}

const onlineHandler = {
  add: (socketId, userId) => {
    console.log(`socket${socketId} added, user>> ${userId}`)
    return (users[socketId] = userId)
  },
  delete: (socketId) => {
    console.log(`user ${users[socketId]} logged out, ${socketId} deleted`)
    return delete users[socketId]
  },
  get: (socketId) => {
    return users[socketId]
  },
  getAllSocketsByUserId: (userId) => {
    const userSockets = Object.keys(users).reduce((arr, socket) => {
      return users[socket] === userId ? [...arr, socket] : [...arr]
    }, [])
    return userSockets
  },

  getAllUsers: () => {
    const list = Object.keys(users).reduce((list, socket) => {
      return { ...list, [users[socket]]: socket }
    }, {})
    return list
  },

  getAllSockets: () => {
    return Object.values(users)
  }
}

export default onlineHandler
