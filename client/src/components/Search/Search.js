import React from 'react'

import './Search.css'
import SearchIcon from '@mui/icons-material/Search'


export default function Search() {
    return (
        <div className='search'>
            <span className='search-header'>
                <SearchIcon />
                <form>
                    <div className='search-input'>
                        <input placeholder='Looking for something?' type='text'></input>
                    </div>
                </form>
            </span>
        </div>
    )
}
