import React from 'react'

function MyConsole({ data }) {
    return (
        <div className='text-gray-light mt-4'>
            { data.map((val) => {
                return val.data ?
                    typeof val.data[0] === 'object' && val.method !== 'error' && val.method !== 'warn' ? < p key={ val.id } >{ " > " + "It is Recommended to see the current output in the Dev Tools because it is an object" }</p> :
                        val.method === 'log' ?
                            < p key={ val.id } >{ " > " + JSON.stringify(val.data).slice(1, -1) }</p>
                            :
                            val.method === 'error' ?
                                < p key={ val.id } className='text-error'> { " > " + JSON.stringify(val.data).slice(1, -1) }</p>
                                :
                                val.method === 'warn' ?
                                    < p key={ val.id } className='text-warning'> { " > " + JSON.stringify(val.data).slice(1, -1) }</p>
                                    : val.method === 'debug' ?
                                        < p key={ val.id } className='text-blue-400'> { " > " + JSON.stringify(val.data).slice(1, -1) }</p>
                                        : ""
                    : ""
            }) }
        </div >
    )
}

export default React.memo(MyConsole);