
const socketService = {
    
    logout: (socket, user) => {
        socket.emit('logout', user)
        socket.disconnect()
    },

    sendMessage: (socket, message) => {
        socket.emit('message', message)
    },
    isTyping: (socket, receiver) => {
        socket.emit('typing', receiver)
    }

}

export default socketService
