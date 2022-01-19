import React from 'react'
import { Link } from "react-router-dom"

function Info() {
    return (
        <div className='bg-accent-blue w-[100%] h-[100vh] flex flex-col  items-center' >
            <div className='flex justify-start items-end w-[60%] h-[15vh]'>
                <Link to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>

                </Link>
            </div>
            <div className='text-5xl border-b-2  flex justify-center items-end'>About the App</div>
            <ol className='w-[80%] md:w-[50%] pt-10'>
                <li>Code Playground is a online application for testing and showcasing user-created and collaborational HTML, CSS and JavaScript code snippets</li>
                <li>It is created by  <a
                    href='https://github.com/Arshanshagarwal'
                    className='no-underline hover:bg-white hover:text-blue-400 hover:font-bold'
                    target='_blank'>
                    Arshansh
                </a></li>
                <li>Code Playground allows the user to create, share and run their code in real-time along with their friends</li>
                <li>Inspired by <a
                    href='https://jsfiddle.net/'
                    className='no-underline hover:bg-white hover:text-blue-400 hover:font-bold'
                    target='_blank'>
                    JSFiddle</a> </li>
            </ol>
        </div>
    )
}

export default Info
