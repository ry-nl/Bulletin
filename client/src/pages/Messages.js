import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import '../css/Messages.css'

import { AuthContext } from '../context/auth'

export default function Messages() {
    const context = useContext(AuthContext)

    return (
        
        <div className='messages'>
            { context.user ?
                <h1>Messages</h1> :
                <Navigate to='/login' replace />
            }
        </div>
    )
}
