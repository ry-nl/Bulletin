import React, { useContext } from 'react'

import './Search.css'
import SearchIcon from '@mui/icons-material/Search'

import { AuthContext } from '../../context/auth'

export default function Search() {
    const { user } = useContext(AuthContext)

    return (
        <div className='search'>
            { user &&
                <span className='search-header'>
                    <SearchIcon />
                    <form>
                        <div className='search-input'>
                            <input placeholder='Looking for something?' type='text'></input>
                        </div>
                    </form>
                </span>
            }
        </div>
    )
}
