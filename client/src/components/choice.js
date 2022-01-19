import React from 'react'
import { Link } from 'react-router-dom'
import { setToast } from '../hooks/hooks';

function Choice() {

    function copyText(entryText) {
        navigator.clipboard.writeText(entryText);
        setToast("Copied the Room id to the clipboard", "success")
    }

    return (
        <div className='h-[100vh] w-[100%] bg-accent-blue flex flex-col justify-center items-center'>
            <div className='h-[30vh] flex w-[60%] items-end justify-end'>
                <Link to='/info'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 1 } d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Link>
            </div>
            <div className='h-[65vh] text-center flex flex-col'>
                <div className='h-[65vh] text-center flex flex-col  items-center'>
                    <div className='text-3xl'>Welcome to Code Playground</div>
                    <div>
                        <button className='bg-blue-400 hover:bg-blue-700 mr-4 ml-4 text-white font-bold py-2 px-4 mt-5  border border-blue-700 rounded'><Link to='/play'>Start a Playground</Link></button>
                        <button className='bg-blue-400 hover:bg-blue-700 mr-4 ml-4 text-white font-bold py-2 px-4 mt-5  border border-blue-700 rounded'><Link to='/join'>Join a Playground</Link></button>
                    </div>
                </div>
                <div
                    className='align-text-bottom mb-4'>
                    Created By{ " " }
                    <a
                        href='https://github.com/Arshanshagarwal'
                        className='no-underline hover:bg-white hover:text-blue-400 hover:font-bold'
                        target='_blank'>
                        Arshansh
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Choice
