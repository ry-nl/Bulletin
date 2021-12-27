import React from 'react'

import './NavbarTab.css'

export default function NavbarTab({ path, currPath, text, Icon }) {
    const active = path === currPath

    return (
        <div className={`navbar-tab ${active && 'navbar-tab--active' }`}>
            <Icon />
            <h2>{text}</h2>
        </div>
    )
}
