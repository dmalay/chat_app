import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginWithToken } from '../redux/actions/auth.actions'

const Startup = (props) => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    useEffect(() => {
        if(token) {
            dispatch(loginWithToken())
        }
    },[])

    return props.children
}

export default Startup
