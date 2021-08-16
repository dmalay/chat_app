export let users = {}

const onlineHandler = {
  add: (socketId, userId) => {
    console.log(`${socketId} added, user>> ${userId}`)
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
      console.log('acc>>',   arr, 'rec>>',   socket)
      return users[socket] === userId
      ? [...arr, socket]
      : [...arr]
    },[])
    console.log('userSockets-reduced',   userSockets)
    return userSockets

  },

  getAllUsers: () => {
    const list = Object.keys(users).reduce((list, socket) => {
      return { ...list, [users[socket]]: socket }
    }, {})
    return list
  },
}

export default onlineHandler
