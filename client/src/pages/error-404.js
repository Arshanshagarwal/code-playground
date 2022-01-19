import React from 'react'

function Error() {
    return (
        <div className='bg-accent-blue h-[100vh] w-[100%] flex flex-col justify-center items-center'>
            <div className='text-6xl'>Erro-404</div>
            <div className='mt-5'>The Room you are trying to access<br />is either non-existent or closed</div>
        </div>
    )
}

export default Error
