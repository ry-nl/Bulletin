import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import '../css/Bookmarks.css'

import { AuthContext } from '../context/auth'

export default function Bookmarks() {
    const context = useContext(AuthContext) // const = { id, username, token }

    return (
        <div className='bookmarks'>
            { context.user ?
                <h1>Bookmarks</h1> :
                <Navigate to='/login' replace />
            }
        </div>
    )
}
