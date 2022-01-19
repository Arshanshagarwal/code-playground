import React, { useRef } from 'react'
import { setToast } from '../hooks/hooks'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
const socket = io.connect('https://code-playground-server.herokuapp.com/')

function JoinIDE() {
    const nameRef = useRef(null)
    const roomIDRef = useRef(null)
    let history = useNavigate();

    const handleClick = () => {
        if (nameRef.current.value === '' || roomIDRef.current.value === '') {
            setToast('Name/RoomID cannot be empty', 'warn')
            return
        }
        const room = roomIDRef.current.value;
        const path = `/${room}`;
        const name = nameRef.current.value;
        console.log(path)
        socket.emit('trying-room', room, name, response => {
            if (response.status === 'error') {
                setToast('Error 404 - No such room Exists!', 'error')
            }
            else {
                history(`/play/${roomIDRef.current.value}/${name}`)
            }
        })




    }
    return (
        <div className='flex w-[100%] h-[100vh] bg-accent-blue justify-center items-center flex-col'>
            <div>
                <label className=' px-6'>NAME:</label>
                <input type='text' className=' mt-5 border-black ml-4 rounded border py-2 px-4' ref={ nameRef } />
            </div>
            <div>
                <label className='px-4'>RoomID:</label>
                <input type='text' className=' mt-5 border-black ml-4 rounded border py-2 px-4' ref={ roomIDRef } />
            </div>
            <div>
                <button className='bg-blue-400 hover:bg-blue-700 mr-4 ml-4 text-white font-bold py-2 px-4 mt-5  border border-blue-700 rounded' onClick={ () => handleClick() }>Join Room</button>
            </div>

        </div>
    )
}

export default JoinIDE
