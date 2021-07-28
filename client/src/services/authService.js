import API from './API'

const authService = {
    login: (data) => {
        return API.post('/auth/login', data)
        .then(({ data }) => {
            return data
        })
        .catch((err) => {
            throw err
        })
    },

    register: (data) => {
        return API.post('/auth/register', data)
        .then(({ data }) => {
            return data
        })
        .catch((err) => {
            throw err
        })
    },

    logout: () => {

    }
}

export default authService