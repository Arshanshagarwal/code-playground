
import React from 'react'
import { useParams, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import LocalIDE from './components/local-ide'
import LocalIdeWithRoomID from './components/localIdeWithRoomID'
import JoinIDE from './components/join-ide'
import Choice from './components/choice'
import Error from './pages/error-404'
import Info from './pages/info'
import 'react-toastify/dist/ReactToastify.css';




function App() {


    return (
        <div>
            <Routes >
                <Route path="" element={ <Choice /> } />
                <Route path="play" element={ <LocalIDE /> } />
                <Route path="play/:id/:name" element={ <LocalIdeWithRoomID /> } />
                <Route path='error' element={ <Error /> } />
                <Route path='info' element={ <Info /> } />
                <Route path="join" element={ <JoinIDE /> } />
            </Routes>
            <ToastContainer hideProgressBar draggable pauseOnHover position="top-center"
            />
        </div>
    )
}

export default App
