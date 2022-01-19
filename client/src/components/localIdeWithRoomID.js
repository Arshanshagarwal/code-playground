import React, { useLayoutEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LocalIDE from './local-ide'
import io from 'socket.io-client'
const socket = io.connect('https://code-playground-server.herokuapp.com/')

function LocalIdeWithRoomID() {

    const { id } = useParams()
    const { name } = useParams()
    const [roomValid, setRoomValid] = useState(false)
    const history = useNavigate()

    useLayoutEffect(() => {
        socket.emit('trying-room', id, name, response => {
            console.log("i am inside layout effect", response.status)
            if (response.status === 'error') {
                history(`/error`)
            } else {
                setRoomValid(true);
            }
        })

    }, [])

    return (
        <>
            {
                roomValid ? <LocalIDE roomID={ id } name={ name } /> : <></>
            }
        </>

    )
}

export default LocalIdeWithRoomID
