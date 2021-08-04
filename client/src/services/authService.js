import API from './API'

const authService = {
    login: (data) => {
        return API.post('/auth/login', data)
        .then(({ data }) => {
            setHeadersAndStorage(data)
            return data
        })
        .catch((err) => {
            throw err
        })
    },

    register: (data) => {
        return API.post('/auth/register', data)
        .then(({ data }) => {
            setHeadersAndStorage(data)
            return data
        })
        .catch((err) => {
            throw err
        })
    },

    loginWithToken: () => {
        return API.get('/auth/login')
        .then(({ data }) => {
            setHeadersAndStorage(data)
            return data
        })
        .catch((err) => {
            throw err
        })
    },

    logout: () => {
        API.defaults.headers['Authorization'] = ''
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    },

    changeCurrentChat: (data) => {
        return API.post('/users/update', data)
        .then(({ data }) => {
            return data
        })
        .catch((err) => {
            throw err
        })

    }
}

const setHeadersAndStorage = ({ user, token }) => {
    API.defaults.headers['Authorization'] = `Bearer ${token}`
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
}

export default authService