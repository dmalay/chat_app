import { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { loginWithToken } from '../redux/actions/auth.actions'

const Startup = (props) => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    console.log('token exists', token)
    useEffect(() => {
        if(token) {
            dispatch(loginWithToken())
        }
    },[])

    return props.children
}

export default Startup
