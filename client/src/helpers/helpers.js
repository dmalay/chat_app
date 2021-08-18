export const findActivePvtDMs = (chats, userId) => {
  return chats.reduce((acc, rec) => {
    if (rec.type === "private") {
      if (rec.subscribers[0]._id === userId) {
        return [...acc, rec.subscribers[1]._id]
      }
      if (rec.subscribers[1]._id === userId) {
        return [...acc, rec.subscribers[0]._id]
      }
      return acc
    }
    return acc
  }, [])
}

export const findActivePvtChats = (chats, userId) => {
  return chats.filter((it) => {
    const subscribed = Boolean(it.subscribers.find((it) => it._id === userId))
    return it.type === "private" && subscribed
  })
}
