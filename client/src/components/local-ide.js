import React, { useState, useEffect, useRef } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import io from 'socket.io-client'
import MyConsole from './console';
import { v4 as uuidv4 } from 'uuid';
import { setToast, copyText } from '../hooks/hooks';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/hint/show-hint.css'

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/keymap/sublime'

const socket = io.connect('https://code-playground-server.herokuapp.com/')
function LocalIDE({ roomID, name }) {
    const [id, setId] = useState('');
    const [share, setShare] = useState(false)
    const [pid, setPid] = useState('')
    const [room, setRoom] = useState('')
    const [memberCount, setMemberCount] = useState('')
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [logs, setLogs] = useState([{}]);
    const [js, setJs] = useState('');
    const [currentTab, setCurrentTab] = useState(1);
    const iframeRef = useRef(null);
    const roomRef = useRef(null)
    const secRef = useRef(null);

    const codeMirrorOptions = {
        theme: 'material',
        lineNumbers: true,
        scrollbarStyle: null,
        lineWrapping: true,
        keyMap: "sublime",
        extraKeys: { "Ctrl-Space": "autocomplete" }
    };

    useEffect(() => {
        if (roomID) {
            socket.emit('member-connecting', roomID, name, response => {
                console.log(response.count)
                setMemberCount(response.count)
                console.log("HELLO")
            })
            setRoom(roomID)
            setId(roomID)
            setShare(true)
        } else {
            setMemberCount(1)
            const pisd = uuidv4();
            setId(pisd)
            setPid(pisd);
        }


        iframeTemplate();
        return () => {
            if (roomID)
                socket.emit('disconnecting', name, roomID)
            socket.close();
        }
    }, []);

    useEffect(() => {
        socket.on('new-js', js => {
            setJs(js)
        })
        socket.on('new-html', html => {
            setHtml(html)
        })
        socket.on('new-css', css => {
            setCss(css)
        })
        socket.on('member-connected', (name, currRoomMembers) => {
            // console.log(currRoomMembers)
            setMemberCount(currRoomMembers)
            setToast(`${name} has connected the room`, 'info')
        })
        socket.on('member-disconnected', (name, currRoomMembers) => {
            // console.log(currRoomMembers)
            setMemberCount(currRoomMembers)
            setToast(`${name} has disconnected the room`, 'info')
        })
        // socket.on('memeber-count-update', currRoomMembers => {
        //     setMemberCount(currRoomMembers)
        // })
    }, [])


    useEffect(() => {
        socket.emit('creating-room', room, socket.id)
    }, [room])


    const iframeTemplate = () => {
        const document = iframeRef.current.contentDocument;
        const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>IFRAME</title>
            <script>

            console.everything = [];

            console.defaultLog = console.log.bind(console);
            console.log = function(){
                console.everything.push({data: Array.from(Object.values(arguments)),  id:(Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))).toString(), method:"log"});
                console.defaultLog.apply(console, arguments);
            }
            console.defaultError = console.error.bind(console);
            console.error = function(){
                console.everything.push({data: [Array.from(Object.values(arguments))],  id:(Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))).toString(), method:"error"});
                console.defaultError.apply(console, arguments);
            }
            console.defaultWarn = console.warn.bind(console);
            console.warn = function(){
                console.everything.push({data: [Array.from(Object.values(arguments))],  id:(Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))).toString(), method:"warn"});
                console.defaultWarn.apply(console, arguments);
            }
            console.defaultDebug = console.debug.bind(console);
            console.debug = function(){
            console.everything.push({data: [Array.from(Object.values(arguments))],  id:(Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))).toString(), method:"debug"});
            console.defaultDebug.apply(console, arguments);
            }
            
            </script>

            <style>
                html {
                    height: 100vh;
                }
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script type="text/javascript" id="main">
                try {
                    ${js}
                }
                catch(e) {
                    console.error(e.name + ' - '  + e.message)
                }
            </script>
          </body>
          </html>
        `;

        document.open();
        document.write(documentContents);
        document.close();

    }


    const createIframe = () => {
        const newIframe = document.createElement('iframe');
        newIframe.title = 'result';
        newIframe.className = 'w-[100%] h-[100%]';
        iframeRef.current = newIframe;
        newIframe.ref = iframeRef;
        newIframe.id = 'iframe'
        secRef.current.appendChild(newIframe)
        iframeTemplate();
    }


    const runCode = () => {
        if (iframeRef) {
            iframeRef.current.parentNode.removeChild(iframeRef.current)
        }
        createIframe()

        const iconsole = iframeRef.current.contentWindow.console;
        setLogs([...iconsole.everything])
    };


    const handleOnShare = () => {
        setShare(!share)
        if (share) {
            setToast('Sharing Stopped', 'success')
            socket.emit('leaving-room', room);
            setRoom(socket.id)
        }
        else {
            setRoom(id)
            setToast('Room Connected', 'success')
        }
    }

    return (
        <>
            <div className='flex w-[100%] h-16 justify-center  bg-secondary text-2xl text-primary text-center items-center' >
                <div className='w-[100%] justify-center flex'>
                    <a className='no-underline' href='/'> Code Playground</a>
                </div>
                <div className='flex'>

                    { share ?
                        <div className='flex items-center mr-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <p>{ memberCount }</p>
                        </div> : <></> }
                </div>


            </div>
            <div className='flex flex-col md:flex-row'>
                <section className="playground w-[100%] md:w-1/2 h-[100%] flex-wrap">
                    <div>
                        <div className='w-[100%]  bg-accent-red flex flex-wrap'>
                            {
                                share ? (<div className='flex items-end justify-center'>
                                    <div className='h-[100%] items-end ml-2 pb-2 flex'>RoomID:</div>
                                    <input
                                        type='text'
                                        ref={ roomRef }
                                        className='border-black ml-4  mt-auto  rounded border py-2 px-4'
                                        readOnly
                                        onClick={ () => copyText('Room ID copied to clipboard', id) }
                                        value={ id } />
                                </div>
                                ) : <></>
                            }


                            <button
                                className='bg-blue-400 hover:bg-blue-700  mr-4 ml-4 text-white font-bold  px-4 mt-5  border border-blue-700 rounded'

                                onClick={ () => { handleOnShare() } }
                            >
                                { share ? 'Stop Sharing' : 'start sharing' }
                            </button>
                            <button
                                className='bg-blue-400 hover:bg-blue-700 mr-4 ml-auto text-white font-bold py-2 px-4 mt-5  border border-blue-700 rounded'
                                onClick={ () => runCode() }>
                                Run
                            </button>
                        </div>
                    </div>
                    <div className='flex bg-accent-light '>

                    </div>

                    <div className='flex bg-accent-light h-[47px] w-[100%] justify-center'>

                        <button
                            className={ currentTab === 1 ? 'selected' : 'deslected' }
                            onClick={ () => setCurrentTab(1) }>
                            Html
                        </button>
                        <button
                            className={ currentTab === 2 ? 'selected' : 'deslected' }
                            onClick={ () => setCurrentTab(2) }>
                            CSS
                        </button>
                        <button
                            className={ currentTab === 3 ? 'selected' : 'deslected' }
                            onClick={ () => setCurrentTab(3) }>
                            JavaScript
                        </button>

                    </div>

                    { currentTab === 1 ?
                        <div className="" >
                            <CodeMirror
                                value={ html }
                                options={ {
                                    mode: 'htmlmixed',
                                    ...codeMirrorOptions,
                                } }
                                onBeforeChange={ (editor, data, html) => {
                                    setHtml(html)
                                    socket.emit('editing-html', html, room)
                                } }
                            />
                        </div > : <></> }
                    { currentTab === 2 ?
                        <div className="">
                            <CodeMirror
                                value={ css }
                                options={ {
                                    mode: 'css',
                                    ...codeMirrorOptions,

                                } }
                                onBeforeChange={ (editor, data, css) => {
                                    setCss(css)
                                    socket.emit('editing-css', css, room)
                                } }
                            />
                        </div> : <></> }
                    { currentTab === 3 ?
                        <div className="">
                            <CodeMirror
                                value={ js }
                                options={ {
                                    mode: 'javascript',
                                    ...codeMirrorOptions,
                                } }
                                onBeforeChange={ (editor, data, js) => {
                                    setJs(js)
                                    socket.emit('editing-js', js, room)
                                } }
                            />
                        </div> : <></> }


                    <div className='w-[100%] h-[34vh] bg-console overflow-y-auto'>
                        <div className="text-center text-gray-light">Console Output</div>
                        <MyConsole data={ logs } />
                    </div>
                </section >
                <section className="border border-black w-[100%] md:w-1/2" id="sectionTag" ref={ secRef }>
                    <iframe title="result" className='h-[100%] w-[100%]' ref={ iframeRef } id="iframe" />
                </section>

            </div >
        </>
    );
}

export default LocalIDE;
