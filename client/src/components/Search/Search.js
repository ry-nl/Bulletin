import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import './Search.css'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar'

// import Input from '../Input/Input'

import { SEARCH_USER } from '../../util/queries'
import { AuthContext } from '../../context/auth'

export default function Search() {
    const { user } = useContext(AuthContext)

    const [input, setInput] = useState('')
    const [searchedUsers, setSearchedUsers] = useState([])

    const navigate = useNavigate()

    const { loading, data = {searchUser: []}, refetch } = useQuery(SEARCH_USER, {
        variables: {
            username: input
        },
        onCompleted(data) {
            setSearchedUsers(data.searchUser)
        }
    })

    useEffect(() => { refetch() }, [refetch, input])

    const handleChange = e => { setInput(e.target.value) }

    return (
        <div className='search'>
            { user &&
                <>
                    <span className='search-header'>
                        <SearchIcon />
                        <form>
                            <div className='search-input'>
                                <input placeholder='Looking for something?' type='text' name='input' onChange={ handleChange } value={ input }></input>
                            </div>
                        </form>
                    </span>
                    <div className='user-row-container'>
                        { searchedUsers.map((userObj) => {
                            return (
                                <div className='user-row' key={ userObj.id } onClick={() => { navigate(`/account/${userObj.username}`) }}>
                                    <Avatar className='user-row-pic' src={ userObj.userPic }/>
                                    <p>{ userObj.username }</p>
                                </div>
                            )
                        }) }
                    </div>
                </>
            }
        </div>
    )
}
