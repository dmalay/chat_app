import React, { useEffect } from 'react'
import SocketIOClient from 'socket.io-client'

function useSocket( user, dispatch) {
    useEffect(() => {
        const socket = SocketIOClient.connect()
        socket.emit('join', user)

        // socket.on('typing', (user) =>{
        //     console.log('event:', user)
        // })

        // socket.on('online', (it) =>{
        //     console.log('event:', it)
        // })

        // socket.on('offline', (it) =>{
        //     console.log('event:', it)
        // })

    }, [dispatch])

}

export default useSocket