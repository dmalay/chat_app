import API from './API'

const chatService = {
fetchChats: () => {
    return API.get('/chats')
    .then(({data}) => {
        return data
    })
    .catch( err => {
        throw err
    })
}
}

export default chatService