import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import './Navbar.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar'

import NavbarTab from './NavbarTab'
import { AuthContext } from '../../context/auth'

export default function Navbar() {
    const { user, logout } = useContext(AuthContext)

    const path = useLocation().pathname

    return (
        <div className='navbar'>
            <div className='account-tab'>
                {user ?
                    <>
                        <Avatar className='user-icon' src={user.userPic} alt={user.username} />
                        <h2>{user.username}</h2>
                    </> :
                    <Avatar className='user-icon' />
                }
            </div>
            <Link to='/' style={user ? {'textDecoration': 'none', 'color': 'white'} : {'textDecoration': 'none', 'color': 'gray'}} className={!user && 'disabled-link'}>
                <NavbarTab path={'/'} currPath={path} text='Home' Icon={DashboardIcon} />
            </Link>
            <Link to='/messages' style={user ? {'textDecoration': 'none', 'color': 'white'} : {'textDecoration': 'none', 'color': 'gray'}} className={!user && 'disabled-link'}>
                <NavbarTab path={'/messages'} currPath={path} text='Messages' Icon={EmailIcon} />
            </Link>
            <Link to='/bookmarks' style={user ? {'textDecoration': 'none', 'color': 'white'} : {'textDecoration': 'none', 'color': 'gray'}} className={!user && 'disabled-link'}>
                <NavbarTab path={'/bookmarks'} currPath={path} text='Bookmarks' Icon={BookmarksIcon} />
            </Link>
            {user && 
                <Link to='/login' style={{'textDecoration': 'none', 'color': 'white'}} onClick={()=>{ logout() }}>
                    <NavbarTab path={'/logout'} currPath={path} text='Log out' Icon={LogoutIcon} /> 
                </Link>
            }
        </div>
    )
}